"use client"
import { Table, SelectItem, Chip, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, NextUIProvider, Select } from "@nextui-org/react";

import { Pagination } from "@nextui-org/react";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from 'react'
import useSWR from 'swr'


const fetcher = (...args: any[]) => fetch(args[0], args[1]).then((res) => res.json());
const options = [
  {
    value: "desc",
    label: "Latest"
  },
  {
    value: "asc",
    label: "Oldest"
  }
]

const Page = () => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [value, setValue] = React.useState(new Set(["asc"]));
  const descValue = Array.from(value)[0];
  console.log(descValue)
  const { data } = useSWR(`/api/AllData?page=${currentPage}&sort=${descValue}`, fetcher, { refreshInterval: 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
   })
  let count: number
  if (data) {

    count = Math.ceil(data.Total / 4)
  }

  const columns = [
    {
      key: "title",
      label: "Issue",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "time",
      label: "Created At",
    }
  ];
  interface YourObjectType {
    Total: number
    PaginatedData: YourDataItemType[]
  }

  interface YourDataItemType {
    createdAt: string;
    id: number;
    status: string;
    title: string;
  }
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="font-medium text-base">
            {user.title}
          </div>
        );
      case "status":
        return (
          <Chip size="sm" color={user.status === "OPEN" ? "danger" : user.status === "PENDING" ? "warning" : user.status === "CLOSED" ? "success" : null} variant="flat">
            {user.status}
          </Chip>
        );
      case "time":
        const date = new Date(user.createdAt);
        const options = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          hour: 'numeric',
          minute: 'numeric'
        };

        const currentDate = new Date();
        const formatted = date.toLocaleDateString(undefined, options);
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

        console.log(formattedDate);
        return (
          <div >
            {formattedDate}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <NextUIProvider>
      <div className="flex justify-between items-center mb-4">
        <Select
          aria-label="drop down to update status"
          variant="bordered"
          selectedKeys={value}
          className="w-32"
          onSelectionChange={setValue}
        >
          {options.map((sort) => (
            <SelectItem key={sort.value} value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </Select>
        <Button className="inline" onClick={() => { router.push("/issues/new") }}>Create a New Ticket</Button>
      </div>
      {data ? (data?.PaginatedData == null ? 
     ( <div className="text-base text-gray-600 font-semibold flex flex-col justify-center items-center">
        <img className="w-56 h-auto" src="/2.png" alt="no_image" />
        Create an Ticket to display here
      </div>) :
        <Table aria-label="Example table with dynamic content"
          onRowAction={(id) => router.push(`/issues/${id}`)}
          selectionMode="single"
          bottomContent=
          {<div className="flex items-center justify-center mt-5">
            <Pagination isCompact showControls page={currentPage}
              onChange={setCurrentPage} total={count} />
          </div>}
        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={data?.PaginatedData}>
            {(item) => (
              <TableRow className="cursor-pointer" key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>)
        :
        <div className="flex mt-6 items-center justify-center">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      }
    </NextUIProvider>
  )
}

export default Page