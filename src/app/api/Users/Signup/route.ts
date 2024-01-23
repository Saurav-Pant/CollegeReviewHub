import prisma from "@/libs/prismadb"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
    reviews?: { collegeName: string; review: string }[];
  }
  
  export async function POST(request: NextRequest) {
    try {
      const reqBody: CreateUserRequest = await request.json();
      const { username, email, password, reviews } = reqBody;
  
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: await bcryptjs.hash(password, await bcryptjs.genSalt(10)),
          reviews: {
            create: reviews, 
          },
        },
        include: {
          reviews: true,
        },
      });
  
      const response = NextResponse.json({
        message: "User created successfully",
        success: true,
        user,
      });
  
      return response;
    } catch (error: any) {
      const response = NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
      return response;
    }
  }
  
  
  export const GET = async () => {
    try {
        const Users = await prisma.user.findMany({
            include: {
                reviews: true,
            },
        });

        const response = NextResponse.json({
            message: "Data Got successfully",
            success: true,
            Users,
        });

        return response;
    } catch (err) {
        return NextResponse.json({ message: "GET Error", err }, { status: 500 })
    }
}
