import connectToDB from "@/DB/db";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    const loggedInUserId = request.url.split("?")[1].split("=")[1];
    const reviews = await Review.find({ user: loggedInUserId }).populate(
      "user",
      "username email"
    );
    console.log(reviews)
    const response = NextResponse.json({
      message: "Review fetched successfully",
      success: true,
      reviews,
    });

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
