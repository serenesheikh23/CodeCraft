import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, minPrice, maxPrice, features, icon, order, isActive } = body;

    if (!name || !description || minPrice === undefined || maxPrice === undefined || !features || !icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const featuresArray = features.split(",").map((f: string) => f.trim()).filter(Boolean);

    const service = await prisma.service.create({
      data: {
        name,
        description,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        features: JSON.stringify(featuresArray),
        icon,
        order: Number(order) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}