import { UserAuth } from "@/app/context/AuthContext";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import React from 'react'

const AccountDropDown = () => {
  const {user, logOut}=UserAuth()
  const handlelogout= async()=>{
    try{
      await logOut()
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user?.photoURL,
            }}
            className="transition-transform"
            name={user?.displayName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@{user?.displayName}</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={handlelogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default AccountDropDown
