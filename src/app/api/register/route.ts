import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import UserGame from "@/models/userScore";
import UserScore from "@/models/userScore";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    await User.create({ email, password: hashedPassword });
    // await UserScore.create({ email });

    return NextResponse.json({ email, password }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occured while registrating the user." },
      { status: 500 }
    );
  }
}
