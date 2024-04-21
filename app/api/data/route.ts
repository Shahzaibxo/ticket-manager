import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {

  const data = await prisma.issue.findMany({
    orderBy: {
      id: 'desc', // Order by auto-incrementing ID in descending order
    },
    take: 4
  });
  const openCount = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  });

  const pendingCount = await prisma.issue.count({
    where: {
      status: 'PENDING'
    }
  });

  const closedCount = await prisma.issue.count({
    where: {
      status: 'CLOSED'
    }
  });
  const AllCount = await prisma.issue.count();



  return NextResponse.json({ PaginatedData: data, Open: openCount, Pending:pendingCount, Closed:closedCount, Total:AllCount });

}