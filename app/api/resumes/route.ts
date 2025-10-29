import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // fetch single resume if ?id=xyz

    if (id) {
      const resume = await prisma.resume.findUnique({ where: { id } });
      if (!resume) return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      return NextResponse.json(resume);
    }

    // Otherwise, return all resumes
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(resumes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const newResume = await prisma.resume.create({
      data: {
        title: data.title,
        sections: data.sections,
        userId,
      },
    });
    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const data = await req.json();
    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume || resume.userId !== userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const updatedResume = await prisma.resume.update({
      where: { id },
      data: { title: data.title, sections: data.sections },
    });
    return NextResponse.json(updatedResume);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resume" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume || resume.userId !== userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    await prisma.resume.delete({ where: { id } });
    return NextResponse.json({ message: "Resume deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
