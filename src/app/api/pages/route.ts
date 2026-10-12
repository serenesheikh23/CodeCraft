import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages = await prisma.customPage.findMany({
      orderBy: { slug: "asc" },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching custom pages:", error);
    return NextResponse.json({ error: "Failed to fetch custom pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const page = await prisma.customPage.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        isActive: data.isActive !== false,
      },
    });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating custom page:", error);
    return NextResponse.json({ error: "Failed to create custom page" }, { status: 500 });
  }
}