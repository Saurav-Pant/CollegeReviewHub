import {NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newCollegeName: collegeName, newReview: review } = await request.json();

    const updatedReview = await prisma.review.update({
      where: {
        id: id
      },
      data: {
        collegeName,
        review,
      },
    });

    const response = NextResponse.json({
      message: "Review Updated successfully",
      success: true,
      updatedReview,
    });
    return response;
  } catch (error) {
    console.error("Error in PUT request:", error);
  }
}


export async function DELETE(request, {params}){
    const id = params.id;
    
    const review = await prisma.review.delete({
        where: {
          id:id
        }
    })

    return NextResponse.json(review)
}

export async function GET(request, {params}){
  const id = params.id;
  
  const review = await prisma.review.findUnique({
      where: {
        id:id
      }
  })

  return NextResponse.json(review)
}
