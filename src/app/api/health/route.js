import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "CodeArena backend and MongoDB connected!",
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}