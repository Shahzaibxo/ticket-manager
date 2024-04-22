import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const page = searchParams.get("page")
    const sort = searchParams.get("sort")
    console.log(sort)
    if (page !== null && sort !==null) {
        const Page = parseInt(page, 10)
        const data = await prisma.issue.findMany({
            orderBy:{
                createdAt: sort
            },
            select:{
                id:true,
                title:true,
                status:true,
                createdAt:true
            },
            skip: (Page - 1) * 4,
            take: 4
        });
        const count = await prisma.issue.count();
        if (!data || !count) {
            return NextResponse.json("No record found", { status: 300 });
        }
        console.log(data)
        return NextResponse.json({ Total: count, PaginatedData: data });
    }
}   