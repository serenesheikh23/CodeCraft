import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const page = await prisma.legalPage.findUnique({ where: { id } });
    if (!page) {
      return NextResponse.json({ error: "Legal page not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching legal page:", error);
    return NextResponse.json({ error: "Failed to fetch legal page" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const page = await prisma.legalPage.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(page);
  } catch (error) {
    console.error("Error updating legal page:", error);
    return NextResponse.json({ error: "Failed to update legal page" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.legalPage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting legal page:", error);
    return NextResponse.json({ error: "Failed to delete legal page" }, { status: 500 });
  }
}