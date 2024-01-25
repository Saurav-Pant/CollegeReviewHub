import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest): boolean {
    const userId = request.cookies.get('userId');
    if (userId?.value) {
      return true;
    } else {
      return false;
    }
  }
  