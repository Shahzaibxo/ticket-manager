import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";


export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const searchParams = new URLSearchParams(url.searchParams)
    const id = parseInt(searchParams.get("id"))
    if (Number.isInteger(id) && id!==null) {
        const data = await prisma.issue.findFirst({
            where:{
                id:id
            }
        });
        if (!data) {
            return NextResponse.json("No record found", { status: 300 });
        }
        return NextResponse.json({ Data: data });
    }
}   