import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";
import Country from "@/models/Country";

export async function GET() {
  try {
    await connectDB();
    
    const exams = await Exam.find({ is_active: true })
      .sort({ display_order: 1, createdAt: -1 })
      .lean() // Use lean() for better performance
    
    const response = NextResponse.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
    
    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=600'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=600');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=600');
    
    return response;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch exams",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
