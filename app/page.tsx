"use client"
import React from "react"
import { NextUIProvider } from '@nextui-org/react';
import { Pagination, Button } from "@nextui-org/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2"
import prisma from "@/prisma/client";
import useSWR from 'swr'

const fetcher = (...args: any[]) => fetch(args[0], args[1]).then((res) => res.json());

interface YourObjectType {
 Total:number
 PaginatedData:YourDataItemType[]
}

interface YourDataItemType{
  createdAt: string;
  description: string;
  id: number;
  status: string;
  title: string;
  updatedAt: string;
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Issues Bar Chart',
    },
  },
};

export default function Home() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, error } = useSWR(`/api/data?page=${currentPage}`, fetcher)
  let count: number
  if (data) {

    count=Math.ceil(data.Total/4)
  }
  return (
    <>
      <NextUIProvider>

        <div className="flex flex-wrap sm:flex-nowrap gap-7 md:gap-36">
          <section className=" flex flex-col gap-4">
            <div className="flex flex-row gap-5 sm:gap-6">
              <div className="border text-center text-sm basis-0 shrink border-zinc-400 grow rounded-xl p-3 h-auto font-medium">
                New: <br /> <span className="font-extrabold text-lg">9</span>
              </div>
              <div className="border text-center p-3 text-sm h-auto shrink basis-0 grow border-zinc-400 rounded-xl font-medium">
                Resolved: <br /> <span className="font-extrabold text-lg">3</span>
              </div>
              <div className="border text-center text-xs p-3 h-auto basis-0 shrink grow border-zinc-400 rounded-xl font-medium">
                Pending:  <br /> <span className="font-extrabold text-lg">7</span>
              </div>
              <div className="border text-center text-sm p-3 h-auto basis-0 shrink grow border-zinc-400 rounded-xl font-medium">
                Total:  <br /> <span className="font-extrabold text-lg">14</span>
              </div>
            </div>
            <div className="border border-zinc-400">
              <Bar
                className="w-60 sm:w-96"
                height={150}

                options={options}
                data={{
                  labels: ["New Issues", "In-progress", "Resolved Issues"],
                  datasets: [
                    {
                      label: "Count",
                      data: [2, 4, 8],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(255, 205, 86,0.4)',
                        'rgba(75, 192, 192, 0.4)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                      ],
                      borderWidth: 1,
                      borderRadius: 5
                    }
                  ]
                }}
              />
            </div>
          </section>
          <section style={{height:"487px"}} className="w-full h-fit border p-3 rounded-2xl border-black">
            <div className="font-semibold text-2xl">
              Latest Issues
            </div>
            <div style={{height:"334px"}}>

            {
              data ? (data as YourObjectType).PaginatedData.map((object) => (
                <div key={object.id} className="mt-6 sm:text-lg font-medium cursor-pointer">
                  {object.title} <br />
                  <span className="border border-red-500 bg-red-200 p-1 text-xs font-thin rounded-lg cursor-pointer">{object.status}</span>
                  <hr className="border border-zinc-300 mt-2" />
                </div>
              )) :
              <div className="flex mt-6 items-center justify-center">

                  <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
            }
            </div>
           {data &&
            <div className="flex items-center justify-center mt-5">
             
              <Pagination isCompact showControls loop page={currentPage}
                onChange={setCurrentPage} total={count} />
             
            </div>}
          </section>
        </div>
      </NextUIProvider>
    </>
  )
}
