import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const addon = await prisma.addOn.findUnique({
      where: { id },
    });

    if (!addon) {
      return NextResponse.json({ error: "Addon not found" }, { status: 404 });
    }

    return NextResponse.json(addon);
  } catch (error) {
    console.error("Error fetching addon:", error);
    return NextResponse.json({ error: "Failed to fetch addon" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, price, icon, order, isActive } = body;

    if (!name || !description || price === undefined || !icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const addon = await prisma.addOn.update({
      where: { id },
      data: {
        name,
        description,
        price: Number(price),
        icon,
        order: Number(order) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(addon);
  } catch (error) {
    console.error("Error updating addon:", error);
    return NextResponse.json({ error: "Failed to update addon" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.addOn.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting addon:", error);
    return NextResponse.json({ error: "Failed to delete addon" }, { status: 500 });
  }
}