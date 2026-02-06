import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search');
    const countrySlug = searchParams.get('country');
    const exam = searchParams.get('exam');
    
    const skip = (page - 1) * limit;
    
    // Build query
    const query: Record<string, unknown> = { is_active: true };
    
    // Search by name or about content
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { about_content: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by country
    if (countrySlug && countrySlug !== 'all') {
      const country = await Country.findOne({ slug: countrySlug, is_active: true });
      if (country) {
        query.country_ref = country._id;
      } else {
        return NextResponse.json({
          success: true,
          message: "Colleges fetched successfully",
          data: { colleges: [], total: 0 },
        });
      }
    }
    
    // Filter by exam
    if (exam && exam !== 'all') {
      query.exams = { $in: [exam] };
    }
    
    // Get total count for pagination
    const total = await College.countDocuments(query);
    
    // Fetch paginated results
    const colleges = await College.find(query)
      .populate('country_ref', 'name slug flag')
      .sort({ ranking: 1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance
    
    const response = NextResponse.json({
      success: true,
      message: "Colleges fetched successfully",
      data: {
        colleges,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: skip + limit < total
      },
    });
    
    // Add caching headers
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=180, stale-while-revalidate=300'
    );
    response.headers.set('CDN-Cache-Control', 'public, s-maxage=300');
    response.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=300');
    
    return response;
  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
