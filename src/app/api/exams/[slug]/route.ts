import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const exam = await Exam.findOne({ slug, is_active: true })
      .lean(); // Use lean() for better performance
    
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }
    
    const response = NextResponse.json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
    
    // Add caching headers for individual exam data
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=600, stale-while-revalidate=900'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=900');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=900');
    
    return response;
  } catch (error) {
    console.error("Error fetching exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
