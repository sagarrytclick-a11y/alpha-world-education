import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();
    
    const college = await College.findOne({ slug, is_active: true })
      .populate('country_ref')
      .lean(); // Use lean() for better performance

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "College fetched successfully",
      data: college,
    });
    
    // Add caching headers for individual college data
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=900'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=900');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=900');
    
    return response;
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
