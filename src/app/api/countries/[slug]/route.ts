import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const country = await Country.findOne({ slug, is_active: true })
      .lean(); // Use lean() for better performance
    
    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country not found",
        },
        { status: 404 }
      );
    }
    
    const response = NextResponse.json({
      success: true,
      message: "Country fetched successfully",
      data: country,
    });
    
    // Add caching headers for individual country data
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=1200'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=1200');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=1200');
    
    return response;
  } catch (error) {
    console.error("Error fetching country:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch country",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
