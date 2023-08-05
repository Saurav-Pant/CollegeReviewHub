import connectToDB from "@/DB/db";
import Review from "@/models/Review";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

connectToDB();

export async function GET(request: NextRequest) {
  try {
    const reviews = await Review.find().populate("user");

    const response = NextResponse.json({
      message: "Review fetched successfully",
      success: true,
      reviews,
      User,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { collegeName, review } = reqBody;
    console.log(reqBody);

    const reviews = await Review.create({
      collegeName,
      review,
      User,
    });

    console.log(reviews);

    const response = NextResponse.json({
      message: "Review created successfully",
      success: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id, collegeName, review } = reqBody;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        collegeName,
        review,
      },
      { new: true }
    );

    const response = NextResponse.json({
      message: "Review updated successfully",
      success: true,
      review: updatedReview,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { id } = reqBody;

    const deletedReview = await Review.findByIdAndDelete(id);

    const response = NextResponse.json({
      message: "Review deleted successfully",
      success: true,
      review: deletedReview,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
