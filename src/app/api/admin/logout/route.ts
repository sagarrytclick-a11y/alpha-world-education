import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response object
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully"
    });

    // Clear the admin auth cookie
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // This deletes the cookie
      expires: new Date(0) // This also ensures the cookie is deleted
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
