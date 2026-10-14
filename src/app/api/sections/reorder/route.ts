import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { orderedIds } = body;

  await prisma.$transaction(
    orderedIds.map((id: string, index: number) =>
      prisma.homepageSection.update({
        where: { id },
        data: { order: index },
      })
    )
  );

  return NextResponse.json({ success: true });
}