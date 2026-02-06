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
    
    // Find the current college to get its country
    const currentCollege = await College.findOne({ slug, is_active: true })
      .populate('country_ref')
      .lean();

    if (!currentCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    // Find related colleges (same country, excluding current college)
    // If not enough colleges from same country, fetch from other countries
    let relatedColleges = await College.find({
      _id: { $ne: currentCollege._id },
      country_ref: currentCollege.country_ref._id,
      is_active: true
    })
    .populate('country_ref')
    .limit(6)
    .sort({ createdAt: -1 })
    .lean();

    // If we don't have enough colleges from the same country, get more from other countries
    if (relatedColleges.length < 3) {
      const additionalColleges = await College.find({
        _id: { $ne: currentCollege._id },
        country_ref: { $ne: currentCollege.country_ref._id },
        is_active: true
      })
      .populate('country_ref')
      .limit(6 - relatedColleges.length)
      .sort({ createdAt: -1 })
      .lean();
      
      relatedColleges = [...relatedColleges, ...additionalColleges];
    }

    return NextResponse.json({
      success: true,
      message: "Related colleges fetched successfully",
      data: relatedColleges,
    });
  } catch (error) {
    console.error("Error fetching related colleges:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch related colleges",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
