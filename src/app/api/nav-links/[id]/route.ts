import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const link = await prisma.navLink.findUnique({
    where: { id },
  });

  if (!link) {
    return NextResponse.json({ error: "Nav link not found" }, { status: 404 });
  }

  return NextResponse.json(link);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();

  const link = await prisma.navLink.update({
    where: { id },
    data: {
      label: data.label,
      href: data.href,
      order: Number(data.order) || 0,
      isActive: data.isActive !== false,
      isExternal: data.isExternal === true,
    },
  });

  return NextResponse.json(link);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.navLink.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}