"use client"
import { useState } from 'react';
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [error, seterror] = useState("")
  const router=useRouter();
  interface IssueForm{
    title:string;
    description:string;
  }
 
  const {register, control, handleSubmit}=useForm<IssueForm>();
  return (
    <div className='max-w-xl'>
    {error && <Callout.Root className='mb-4' color='red'>
      <Callout.Text>{error}</Callout.Text>
    </Callout.Root>}
    <form className='space-y-3'
    onSubmit={handleSubmit(async(data)=>{
      await axios.post("/api/issues",data)
      .then(res=>{
        console.log(res.data)
        router.push('/issues')
      })
      .catch(()=> seterror("Please enter Input Correctly"))      
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
    </div>
  )
}

export default Page
