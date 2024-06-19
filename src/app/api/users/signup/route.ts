import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectDb();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    if (!email || !password || !username) {
    }
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: "user already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    //send mail

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({ message: "User Registered", user: savedUser });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      message: "Something went wrong",
    });
  }
}
