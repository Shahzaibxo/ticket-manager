import { NextResponse,NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req:NextRequest) {
    const url= new URL(req.url)
    const searchParams=new URLSearchParams(url.searchParams)
    const page=searchParams.get("page")
    if (page !== null) {
        const Page=parseInt(page, 10)
        const data = await prisma.issue.findMany({
            orderBy: {
                id: 'desc', // Order by auto-incrementing ID in descending order
              },
              take: 4
        });
        const count= await prisma.issue.count();
        if (!data || !count) {
            return NextResponse.json("No record found", { status: 300 });
        }
        console.log(count)
        return NextResponse.json({Total:count, PaginatedData:data});
    }
}