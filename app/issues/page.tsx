import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
       <Link href="/issues/new">
        <Button>okok</Button>
       </Link>
    </div>
  )
}

export default Page
