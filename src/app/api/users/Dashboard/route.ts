import connectToDB from "@/DB/db";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    const loggedInUserId = localStorage.getItem("userId");

    const reviews = await Review.find({ user: loggedInUserId }).populate(
      "user",
      "username email"
    );

    const response = NextResponse.json({
      message: "Review fetched successfully",
      success: true,
      reviews,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}