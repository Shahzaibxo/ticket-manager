"use client"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import AccountDropDown from "../component/AccountDropDown.tsx"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { NextUIProvider } from "@nextui-org/react";
import { AiFillBug } from 'react-icons/ai'
const Navbar = () => {
  const path = usePathname()
  const link = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" }
  ]
  return (
    <NextUIProvider>
      <nav className='flex border-b justify-between items-center px-3'>
        <div className="flex h-14 px-5 gap-3 items-center">
        <Link href="/"><AiFillBug /></Link>
        <ul className='flex space-x-6'>
          {
            link.map(singlink =>
              <li key={singlink.href}>
                <Link href={singlink.href} className={`${singlink.href === path ? "text-zinc-900 font-medium" : "text-zinc-500"} hover:text-zinc-800 transition-colors hover:underline`}>{singlink.label}</Link>
              </li>
            )
          }
        </ul>
          </div>
        <div className="mt-3 ml-3">
          <AccountDropDown />
        </div>
      </nav>
    </NextUIProvider>
  )
}

export default Navbar
