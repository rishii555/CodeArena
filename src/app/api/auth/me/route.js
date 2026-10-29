
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret || secret.length < 32) {
      return NextResponse.json(
        { success: false, message: "Authentication is not configured" },
        { status: 500 }
      );
    }

    const token = request.cookies.get("codearena_session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    let payload;

    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(secret),
        { algorithms: ["HS256"] }
      );

      payload = verified.payload;
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid or expired session" },
        { status: 401 }
      );
    }

    if (!payload.sub) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(payload.sub)
      .select("name username email avatar createdAt")
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error.message);

    return NextResponse.json(
      { success: false, message: "Unable to verify session" },
      { status: 500 }
    );
  }
}
