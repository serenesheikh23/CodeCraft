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
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
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
    const { title, slug, description, problem, solution, outcome, imageUrl, liveUrl, githubUrl, techStack, featured, order, isActive } = body;

    if (!title || !slug || !description || !problem || !solution || !outcome || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const techStackArray = techStack.split(",").map((f: string) => f.trim()).filter(Boolean);

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        problem,
        solution,
        outcome,
        imageUrl,
        liveUrl: liveUrl || "",
        githubUrl: githubUrl || "",
        techStack: JSON.stringify(techStackArray),
        featured: featured ?? false,
        order: Number(order) || 0,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}