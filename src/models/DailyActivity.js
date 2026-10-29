
import mongoose from "mongoose";

const DailyActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Date in YYYY-MM-DD format, based on the user's timezone
    dateKey: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    // Number of distinct problems solved successfully that day
    solvedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Total submissions made that day
    submissionCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
  },
  {
    timestamps: true,
  }
);

// Ek user ke liye ek date par sirf ek activity document
DailyActivitySchema.index(
  { user: 1, dateKey: 1 },
  { unique: true }
);

export default mongoose.models.DailyActivity ||
  mongoose.model("DailyActivity", DailyActivitySchema);
