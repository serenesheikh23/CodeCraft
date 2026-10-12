import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { clientName, clientRole, clientCompany, content, rating, avatarUrl, order, isActive } = body;

    if (!clientName || !clientRole || !clientCompany || !content || !avatarUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientRole,
        clientCompany,
        content,
        rating: Number(rating) || 5,
        avatarUrl,
        order: Number(order) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}