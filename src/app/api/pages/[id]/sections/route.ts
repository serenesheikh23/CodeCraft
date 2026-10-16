import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sections = await prisma.pageSection.findMany({
      where: { pageId: id },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching page sections:", error);
    return NextResponse.json({ error: "Failed to fetch page sections" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const section = await prisma.pageSection.create({
      data: {
        pageId: id,
        type: data.type,
        title: data.title || "",
        subtitle: data.subtitle || "",
        content: JSON.stringify(data.content || {}),
        order: Number(data.order) || 0,
      },
    });
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error("Error creating page section:", error);
    return NextResponse.json({ error: "Failed to create page section" }, { status: 500 });
  }
}