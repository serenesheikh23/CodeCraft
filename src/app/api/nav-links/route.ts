import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const links = await prisma.navLink.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching nav links:", error);
    return NextResponse.json({ error: "Failed to fetch nav links" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const link = await prisma.navLink.create({
      data: {
        label: data.label,
        href: data.href,
        order: Number(data.order) || 0,
        isActive: data.isActive !== false,
        isExternal: data.isExternal === true,
      },
    });
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Error creating nav link:", error);
    return NextResponse.json({ error: "Failed to create nav link" }, { status: 500 });
  }
}