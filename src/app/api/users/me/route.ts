import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    const data: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    const user = await User.findById(data.id).select("-password");
    if (!user) {
      return NextResponse.json({
        error: "user not found",
        status: 404,
        message: "user not found",
      });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      message: "Something went wrong",
    });
  }
}
