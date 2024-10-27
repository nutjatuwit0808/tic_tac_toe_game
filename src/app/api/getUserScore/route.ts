import { connectMongoDB } from "@/lib/mongodb";
import UserScore from "@/models/userScore";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  try {
    await connectMongoDB();

    // Extract 'email' from query parameters
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Find user score by email
    const userScore = await UserScore.findOne({ email }).select({
      _id: 1,
      email: 1,
      score: 1,
      winning_streak: 1,
    });

    console.log("userScore => ", userScore);

    return NextResponse.json({ userScore });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
