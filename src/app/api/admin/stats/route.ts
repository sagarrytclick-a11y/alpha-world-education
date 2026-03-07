import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import College from "@/models/College";
import Blog from "@/models/Blog";
import Exam from "@/models/Exam";
import Enquiry from "@/models/Enquiry";

export async function GET() {
  try {
    console.log('🚀 [API] GET /api/admin/stats - Request received');
    
    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    console.log('📊 [API] Counting documents in all collections...');
    
    // Get counts from all collections in parallel for better performance
    const [countriesCount, collegesCount, blogsCount, examsCount, pendingEnquiriesCount] = await Promise.all([
      Country.countDocuments({}),
      College.countDocuments({}),
      Blog.countDocuments({}),
      Exam.countDocuments({}),
      Enquiry.countDocuments({ status: 'pending', is_active: true })
    ]);
    
    const statsData = {
      countries: countriesCount,
      colleges: collegesCount,
      blogs: blogsCount,
      exams: examsCount,
      pendingEnquiries: pendingEnquiriesCount
    };
    
    console.log('✅ [API] Stats calculated:', statsData);
    
    return NextResponse.json({
      success: true,
      message: "Stats fetched successfully",
      data: statsData,
    });
  } catch (error) {
    console.error("💥 [API] Error fetching stats:", error);
    console.error("💥 [API] Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack available'
    });
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch stats",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
