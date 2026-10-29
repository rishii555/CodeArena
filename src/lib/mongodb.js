
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const cached = globalThis.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cached;

export default async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing. Check your root .env.local file."
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully!");
        return mongooseInstance;
      })
      .catch((error) => {
        console.error("MongoDB error name:", error.name);
        console.error("MongoDB error message:", error.message);

        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
