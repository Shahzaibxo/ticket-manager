import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = parseInt(searchParams.get("id") as string)
    if (Number.isInteger(id) && id!==null) {
        const data = await prisma.issue.delete({
            where:{
                id:id
            }
        });
       
        return NextResponse.json("done",{status:200});
    }
}   