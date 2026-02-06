import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug, is_active: true })
      .lean(); // Use lean() for better performance
    
    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }
    
    const response = NextResponse.json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
    
    // Add caching headers for individual blog data
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=900'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=900');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=900');
    
    return response;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
