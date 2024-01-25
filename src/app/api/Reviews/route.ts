import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb"


export async function GET(request: NextRequest) {
  try {
    const reviews = await prisma.review.findMany()
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

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { collegeName, review, creator, creatorImgUrl,userId } = reqBody;
    console.log(reqBody);      

    const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      

    const Review = await prisma.review.create({
        data: {
          collegeName,
          review,
          creator,
          creatorImgUrl,
          user: {
            connect: { id: userId },
          },
        },
      });
    console.log(Review);

    const response = NextResponse.json({
      message: "Review created successfully!",
      success: true,
      Review
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
