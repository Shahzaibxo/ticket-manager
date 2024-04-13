"use client"
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router=useRouter();
  interface IssueForm{
    title:string;
    description:string;
  }
 
  const {register, control, handleSubmit}=useForm<IssueForm>();
  return (
    <form className='max-w-xl space-y-3'
    onSubmit={handleSubmit(async(data)=>{
      await axios.post("/api/issues",data)
      .then(res=>{
        console.log(res.data)
      })
      router.push('/issues')
      console.log(data)
    })

    }>
      <TextField.Root placeholder='Title' {...register("title")}/>
      <Controller 
      name='description'
      control={control}
      render={({field})=>
      <SimpleMDE placeholder='Description' {...field}/>
      }
      />
      <Button>Submit</Button>
    </form>
  )
}

export default Page
