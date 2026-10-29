
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Problem from "@/models/Problem";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const problem = await Problem.findOne({
      slug: slug.toLowerCase(),
      published: true,
    })
      .select(
        "title slug description difficulty tags constraints starterCode createdAt"
      )
      .lean();

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: "Problem not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      problem,
    });
  } catch (error) {
    console.error("GET /api/problems/[slug]:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch problem",
      },
      { status: 500 }
    );
  }
}
