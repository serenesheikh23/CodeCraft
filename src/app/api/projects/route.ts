import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, description, problem, solution, outcome, imageUrl, liveUrl, githubUrl, techStack, featured, order, isActive } = body;

    if (!title || !slug || !description || !problem || !solution || !outcome || !imageUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const techStackArray = techStack.split(",").map((f: string) => f.trim()).filter(Boolean);

    const project = await prisma.project.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}