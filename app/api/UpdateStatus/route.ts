import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
type Status = 'OPEN' | 'PENDING' | "CLOSED"

export async function PUT(req:NextRequest) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const status = searchParams.get("status")
    const id = parseInt(searchParams.get("id") as string)
    if (status!==null && Number.isInteger(id)) {
       await prisma.issue.update({
           where:{
            id:id
           },
           data:{
            status:status as Status
           }

        });
        
        return NextResponse.json("ok", {status:200});
    }
}