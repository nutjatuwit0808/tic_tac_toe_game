import mongoose, { Schema } from "mongoose";

const userScoreSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    winning_streak: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserScore =
  mongoose.models.UserScore || mongoose.model("UserScore", userScoreSchema);
export default UserScore;
