
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

export const runtime = "nodejs";

// GET: Fetch published problems
export async function GET() {
  try {
    await connectDB();

    const problems = await Problem.find({ published: true })
      .select("-testCases")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: problems.length,
      problems,
    });
  } catch (error) {
    console.error("GET /api/problems:", error.message);

    return NextResponse.json(
      { success: false, message: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

// POST: Create a problem (temporary development endpoint)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      description,
      difficulty,
      tags = [],
      constraints = [],
      testCases = [],
      starterCode = {},
      published = false,
    } = body;

    if (!title || !slug || !description || !difficulty) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug, description and difficulty are required",
        },
        { status: 400 }
      );
    }

    if (!["Easy", "Medium", "Hard"].includes(difficulty)) {
      return NextResponse.json(
        { success: false, message: "Invalid difficulty" },
        { status: 400 }
      );
    }

    if (
      typeof title !== "string" ||
      typeof slug !== "string" ||
      typeof description !== "string" ||
      !Array.isArray(tags) ||
      !Array.isArray(constraints) ||
      !Array.isArray(testCases) ||
      typeof starterCode !== "object" ||
      starterCode === null ||
      Array.isArray(starterCode) ||
      typeof published !== "boolean"
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid field types" },
        { status: 400 }
      );
    }

    const problem = await Problem.create({
      title,
      slug,
      description,
      difficulty,
      tags,
      constraints,
      testCases,
      starterCode,
      published,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Problem created successfully",
        problem: {
          _id: problem._id,
          title: problem.title,
          slug: problem.slug,
          difficulty: problem.difficulty,
          published: problem.published,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A problem with this slug already exists" },
        { status: 409 }
      );
    }

    console.error("POST /api/problems:", error.message);

    return NextResponse.json(
      { success: false, message: "Failed to create problem" },
      { status: 500 }
    );
  }
}
