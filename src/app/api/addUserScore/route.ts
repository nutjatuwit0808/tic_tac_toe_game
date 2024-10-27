import { connectMongoDB } from "@/lib/mongodb";
import UserScore from "@/models/userScore";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const { email } = await req.json();

    await connectMongoDB();
    const userScore = await UserScore.findOne({ email }).select({
      _id: 1,
      score: 1,
      winning_streak: 1,
    });

    if (userScore) {
      //update
      let addScore = userScore.winning_streak >= 3 ? 2 : 1;
      let winStreak =
        userScore.winning_streak >= 3 ? 1 : userScore.winning_streak + 1;

      await UserScore.updateOne(
        { email },
        {
          $set: {
            score: userScore.score + addScore,
            winning_streak: winStreak,
          },
        }
      );
    } else {
      //create
      await UserScore.create({ email, score: 1, winning_streak: 1 });
    }

    return NextResponse.json({ email }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registrating the user." },
      { status: 500 }
    );
  }
}
