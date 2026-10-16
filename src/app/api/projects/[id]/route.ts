import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch (e) {
    console.error("Invalid JSON body");
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  console.log("=== PUT /api/projects/" + id + " ===");
  console.log("Received images:", JSON.stringify(body.images));

  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: String(body.title ?? ""),
        slug: String(body.slug ?? ""),
        description: String(body.description ?? ""),
        problem: String(body.problem ?? ""),
        solution: String(body.solution ?? ""),
        outcome: String(body.outcome ?? ""),
        imageUrl: String(body.imageUrl ?? ""),
        liveUrl: String(body.liveUrl ?? ""),
        techStack: String(body.techStack ?? "[]"),
        images: String(body.images ?? "[]"),
        featured: body.featured === true,
        order: Number(body.order) || 0,
        isActive: body.isActive !== false,
      },
    });
    console.log("Saved successfully. Images in DB:", project.images);
    return NextResponse.json(project);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("PUT FAILED:", msg);
    return NextResponse.json({ error: "Failed", detail: msg }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
