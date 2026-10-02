import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const addons = await prisma.addOn.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(addons);
  } catch (error) {
    console.error("Error fetching addons:", error);
    return NextResponse.json({ error: "Failed to fetch addons" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, price, icon, order, isActive } = body;

    if (!name || !description || price === undefined || !icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const addon = await prisma.addOn.create({
      data: {
        name,
        description,
        price: Number(price),
        icon,
        order: Number(order) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(addon, { status: 201 });
  } catch (error) {
    console.error("Error creating addon:", error);
    return NextResponse.json({ error: "Failed to create addon" }, { status: 500 });
  }
}