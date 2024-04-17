"use client"
import { Table, Chip, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, NextUIProvider } from "@nextui-org/react";
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'


const fetcher = (...args: any[]) => fetch(args[0], args[1]).then((res) => res.json());

const Page = () => {
  const { data } = useSWR(`/api/AllData?page=1`, fetcher)

  const columns = [
    {
      key: "title",
      label: "TITLE",
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
          <div>
            {user.title}
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
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
      <Link href="/issues/new">
        <Button>okok</Button>
      </Link>
      {data ?
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={data?.PaginatedData}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
        : null}
    </NextUIProvider>
  )
}

export default Page
