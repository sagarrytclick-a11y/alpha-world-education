import { NextResponse } from "next/server";
import { SignJWT } from "jose"; // 'npm install jose' karein
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Admin check
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // JWT Create karein
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h") 
      .sign(secret);

    // Cookie set karein (Security ke liye HttpOnly)
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: true, // sirf HTTPS par chalega
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}