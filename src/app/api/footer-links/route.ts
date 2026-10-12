import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const links = await prisma.footerLink.findMany({
      orderBy: [{ section: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching footer links:", error);
    return NextResponse.json({ error: "Failed to fetch footer links" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const link = await prisma.footerLink.create({
      data: {
        section: data.section,
        label: data.label,
        href: data.href,
        order: Number(data.order) || 0,
        isActive: data.isActive !== false,
      },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Error creating footer link:", error);
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 });
  }
}