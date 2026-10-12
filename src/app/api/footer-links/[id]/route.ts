import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const link = await prisma.footerLink.update({
      where: { id },
      data: {
        section: data.section,
        label: data.label,
        href: data.href,
        order: Number(data.order) || 0,
        isActive: data.isActive !== false,
      },
    });
    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating footer link:", error);
    return NextResponse.json({ error: "Failed to update footer link" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.footerLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting footer link:", error);
    return NextResponse.json({ error: "Failed to delete footer link" }, { status: 500 });
  }
}