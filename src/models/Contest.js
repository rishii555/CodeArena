
import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
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
      default: "",
      maxlength: 2000,
    },

    problems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startAt;
        },
        message: "Contest end time must be after start time.",
      },
    },

    status: {
      type: String,
      enum: ["Draft", "Upcoming", "Live", "Completed"],
      default: "Draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ContestSchema.index({ status: 1, startAt: 1 });

export default mongoose.models.Contest ||
  mongoose.model("Contest", ContestSchema);
