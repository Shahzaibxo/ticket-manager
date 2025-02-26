"use client"
import { MdCancel } from "react-icons/md";
import { useState } from 'react';
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { UserAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Textarea } from "@nextui-org/react";
import Image from 'next/image';

const Page = () => {
  const [title, setTitle] = useState('');
  const [fileInput, setFileInput] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {user}= UserAuth()
  const router=useRouter()
  if(!user){
    return(
      <div className="flex flex-col items-center justify-center h-screen">
        <Image width={254} height={254} src="/login-bro.svg" alt="login" />
        <div className="text-lg font-semibold">Sign-in to Continue</div>
      </div>
    )
  }
  const onChangeHandle = (e:any) => {
    setFileInput(e.target.files[0]);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    if(fileInput){
      formData.append('image', fileInput);
    }
    formData.append('title', title);
    formData.append('description', description);
    try {

      await axios.post("/api/issues", formData)
        .catch(() => setError("Please enter Input Correctly"))
    }
    finally {
      setIsLoading(false)
      router.push("/issues")
    }
  };
  return (
    <div>

      {
      error && <Callout.Root className='mb-4' color='red'>
        <Callout.Icon>
          <MdCancel onClick={() => setError("")} />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>
      }
      <form className='flex flex-wrap sm:flex-nowrap gap-7' onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{width:"546px"}} className="flex flex-col">
      <h1 className="text-xl mb-2 font-bold dark:text-white">Issue Subject</h1>


          <TextField.Root placeholder='Title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
          <h1 className="my-2 text-xl font-bold dark:text-white">Describe Your issue in detail</h1>
          <Textarea
            variant="faded"
            description="Enter a concise description of your Issue"
            value={description}
            onValueChange={setDescription}
          />
          
        </div>
        <div className="w-fit">
          <h1 className="text-base font-bold dark:text-white">Attach an image - Optional</h1>
          <input className="mb-2" type="file" onChange={onChangeHandle} accept="image/*" />
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Page