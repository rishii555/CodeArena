
import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    language: {
      type: String,
      enum: ["cpp", "java", "python", "javascript"],
      required: true,
    },

    sourceCode: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Running",
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
        "Internal Error",
      ],
      default: "Pending",
    },

    runtimeMs: {
      type: Number,
      default: null,
      min: 0,
    },

    memoryKb: {
      type: Number,
      default: null,
      min: 0,
    },

    passedTests: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalTests: {
      type: Number,
      default: 0,
      min: 0,
    },

    judgedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// User ki latest submissions jaldi fetch karne ke liye
SubmissionSchema.index({ user: 1, createdAt: -1 });

// Kisi user ki kisi problem ki submissions ke liye
SubmissionSchema.index({ user: 1, problem: 1, createdAt: -1 });

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
