
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret || secret.length < 32) {
      return NextResponse.json(
        { success: false, message: "Authentication is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (!identifier || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/username and password are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+passwordHash");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user._id.toString())
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });

    response.cookies.set("codearena_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Login error:", error.message);

    return NextResponse.json(
      { success: false, message: "Unable to log in" },
      { status: 500 }
    );
  }
}

