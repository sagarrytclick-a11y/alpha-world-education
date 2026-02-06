import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET() {
  try {
    await connectDB();
    const countries = await Country.find({ is_active: true })
      .sort({ name: 1 })
      .lean(); // Use lean() for better performance
    
    const response = NextResponse.json({
      success: true,
      message: "Countries fetched successfully",
      data: countries,
    });
    
    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=900'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=900');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=900');
    
    return response;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch countries",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
