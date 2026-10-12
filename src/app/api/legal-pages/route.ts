import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pages = await prisma.legalPage.findMany({
      orderBy: { slug: "asc" },
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return NextResponse.json({ error: "Failed to fetch legal pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const page = await prisma.legalPage.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Error creating legal page:", error);
    return NextResponse.json({ error: "Failed to create legal page" }, { status: 500 });
  }
}