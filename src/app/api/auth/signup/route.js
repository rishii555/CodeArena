
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const runtime = "nodejs";

const secret = process.env.AUTH_SECRET;

function normalize(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  try {
    if (!secret || secret.length < 32) {
      console.error("AUTH_SECRET is missing or too short.");

      return NextResponse.json(
        { success: false, message: "Server authentication is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = normalize(body.name);
    const username = normalize(body.username).toLowerCase();
    const email = normalize(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (name.length > 60) {
      return NextResponse.json(
        { success: false, message: "Name must be at most 60 characters" },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      return NextResponse.json(
        {
          success: false,
          message: "Username must be 3–30 characters: letters, numbers or underscores",
        },
        { status: 400 }
      );
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters and at most 72 UTF-8 bytes",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    }).lean();

    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";

      return NextResponse.json(
        { success: false, message: `${field} is already registered` },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      username,
      email,
      passwordHash,
    });

    const token = await new SignJWT({
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user._id.toString())
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set("codearena_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email or username is already registered" },
        { status: 409 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Signup error:", error.message);

    return NextResponse.json(
      { success: false, message: "Unable to create account" },
      { status: 500 }
    );
  }
}
