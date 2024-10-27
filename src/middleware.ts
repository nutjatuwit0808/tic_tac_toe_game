// middleware.ts or middleware.js (in the root or specific folders)
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { useCheckSession } from "./hooks/useSession";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  // console.log("in middleware pathname => ", pathname);

  // const token = req.cookies.get("token");

  // Check if the user is authenticated
  // if(pathname === "/login") {
  //   if(token) return NextResponse.redirect(new URL("/tictactoe", req.url));

  // } else if(pathname === "/tictactoe") {
  //   if(!token) return NextResponse.redirect(new URL("/login", req.url));
  // }

  // If authenticated, proceed with the request
  return NextResponse.next();
}

// Specify the paths to protect
export const config = {
  // matcher: ["/login", "/tictactoe"], // Adjust the path based on your needs
};
