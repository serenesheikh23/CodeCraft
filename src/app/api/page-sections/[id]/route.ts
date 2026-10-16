import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const section = await prisma.pageSection.findUnique({
    where: { id },
  });

  if (!section) {
    return NextResponse.json({ error: "Page section not found" }, { status: 404 });
  }

  return NextResponse.json(section);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { type, title, subtitle, content, order } = body;

  const section = await prisma.pageSection.update({
    where: { id },
    data: {
      type,
      title,
      subtitle,
      content: JSON.stringify(content),
      order,
    },
  });

  return NextResponse.json(section);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.pageSection.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}