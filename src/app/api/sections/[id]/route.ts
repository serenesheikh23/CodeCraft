import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const section = await prisma.homepageSection.findUnique({
    where: { id },
  });

  if (!section) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  return NextResponse.json(section);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { type, name, title, subtitle, content, order, isVisible } = body;

  const section = await prisma.homepageSection.update({
    where: { id },
    data: {
      type,
      name,
      title,
      subtitle,
      content: JSON.stringify(content),
      order,
      isVisible,
    },
  });

  return NextResponse.json(section);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.homepageSection.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}