"use client"
import AccountDropDown from "../component/AccountDropDown.tsx"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button, NextUIProvider } from "@nextui-org/react";
import { AiFillBug } from 'react-icons/ai'
import { UserAuth } from "./context/AuthContext.tsx";
const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth()
  const path = usePathname()
  const link = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" }
  ]
  const handlelogin = async () => {
    try {
      await googleSignIn()
    }
    catch (error) {
      console.log(error)
    }
  }
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
        <div className="mt-3 ml-3 flex gap-3 items-center">
          <Button variant="flat" color="secondary" size="sm"><a href="https://github.com/Shahzaibxo" target="_blank">Github</a></Button>
          {user ? <AccountDropDown /> : <Button variant="ghost" color="primary" size="sm" onClick={handlelogin}>Sign-In</Button>}

        </div>
      </nav>
    </NextUIProvider>
  )
}

export default Navbar
