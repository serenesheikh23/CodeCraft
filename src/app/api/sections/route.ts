import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sections = await prisma.homepageSection.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const section = await prisma.homepageSection.create({
      data: {
        type: data.type,
        name: data.name || "",
        title: data.title || "",
        subtitle: data.subtitle || "",
        content: JSON.stringify(data.content || {}),
        order: Number(data.order) || 0,
        isVisible: data.isVisible !== false,
      },
    });
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error("Error creating section:", error);
    return NextResponse.json({ error: "Failed to create section" }, { status: 500 });
  }
}