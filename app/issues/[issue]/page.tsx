"use client"
import { Button, Chip, NextUIProvider, Select, SelectItem } from '@nextui-org/react'
import axios from 'axios';
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { useState } from 'react';


const fetcher = (...args: any[]) => fetch(args[0], args[1]).then((res) => res.json());
const options = [
    {
        value: "OPEN",
        label: "Not Resolved"
    },
    {
        value: "PENDING",
        label: "Under-fix"
    },
    {
        value: "CLOSED",
        label: "Resolved"
    }
]
export default function Page({ params }: { params: { issue: string } }) {
        const { mutate } = useSWRConfig()
    const id = parseInt(params.issue)
    const { data } = useSWR(`/api/issuebyid?id=${id}`, fetcher)
    const [value, setValue] = React.useState("ok");
    const [isLoading, setIsLoading] = useState(false);
    const handleSelectionChange = async (e) => {
        setValue(e.target.value);
        setIsLoading(true)
        try{
            await axios.put(`/api/UpdateStatus?status=${e.target.value}&id=${id}`)
        }
        finally{
            setIsLoading(false)
            mutate(`/api/issuebyid?id=${id}`)
        }
      };
      
    
    const date = new Date(data?.Data.createdAt);

    console.log(value);

    const dataops = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric'
    };

    const currentDate = new Date();
    const formatted = date.toLocaleDateString(undefined, dataops);
    let formattedDate

    if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        formattedDate = formatted.split(',')[1].trim();
    } else {
        formattedDate = formatted;
    }


    return (
        <NextUIProvider>
            <main className=''>

                <div className='ml-5'>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className='text-2xl font-bold'>
                                My Post: {data?.Data.title}
                            </h1>
                            <div className='flex gap-4 mt-3'>
                                <Chip variant='flat' size='sm' color={data?.Data.status === "OPEN" ? "danger" : data?.Data.status === "PENDING" ? "warning" : data?.Data.status === "CLOSED" ? "success" : null}>{data?.Data.status}</Chip>
                                <div className='text-base'>{data ? formattedDate : null}
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            {data &&
                                <Select
                                    aria-label="drop down to update status"
                                    label="Update Status"
                                    color={data?.Data.status === "OPEN" ? "danger" : data?.Data.status === "PENDING" ? "warning" : data?.Data.status === "CLOSED" ? "success" : null}
                                    className="w-44"
                                    defaultSelectedKeys={[data?.Data.status]}
                                    onChange={handleSelectionChange}>
                                    {options.map((sort) => (
                                        <SelectItem key={sort.value} value={sort.value}>
                                            {sort.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            }
                            <Button className='mr-10 w-8 h-8' color='danger'>Delete</Button>
                        </div>
                    </div>
                    <div className='border-1 border-gray-600 rounded-lg py-5 px-2 mt-3 mr-10'>
                        {data?.Data.description}
                    </div>
                </div>

            </main>

        </NextUIProvider>
    )
}
