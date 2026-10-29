
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function getCurrentUser() {
  try {
    const secret = process.env.AUTH_SECRET;

    if (!secret || secret.length < 32) {
      throw new Error("AUTH_SECRET is missing or invalid");
    }

    // Get the login cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("codearena_session")?.value;

    if (!token) {
      return null;
    }

    // Verify the JWT token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      {
        algorithms: ["HS256"],
      }
    );

    if (!payload.sub) {
      return null;
    }

    // Connect to MongoDB
    await connectDB();

    // Find the logged-in user
    const user = await User.findById(payload.sub)
      .select("name username email avatar role createdAt")
      .lean();

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt,
    };
  } catch (error) {
    // Invalid or expired token, or database error
    if (
      error.code === "ERR_JWT_INVALID" ||
      error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
      error.code === "ERR_JWT_EXPIRED" ||
      error.code === "ERR_JWT_CLAIM_VALIDATION_FAILED"
    ) {
      return null;
    }

    console.error("getCurrentUser error:", error.message);
    return null;
  }
}
