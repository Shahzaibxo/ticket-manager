import { NextResponse } from "next/server";
import prisma from "@/prisma/client";



export async function GET(){
    
        const data= await prisma.issue.findMany()
        if(!data){
            return NextResponse.json("No record found",{status:300})
        }
  
return NextResponse.json(data,{status:201})
}