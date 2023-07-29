import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.redirect("/login");
    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
