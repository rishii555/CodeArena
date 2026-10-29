
import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    tags: [{ type: String, trim: true }],

    constraints: [{ type: String }],

    testCases: [
      {
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
        isHidden: { type: Boolean, default: true },
      },
    ],

    starterCode: {
      type: Map,
      of: String,
      default: {},
    },

    published: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

ProblemSchema.index({ published: 1, difficulty: 1 });

export default mongoose.models.Problem ||
  mongoose.model("Problem", ProblemSchema);
