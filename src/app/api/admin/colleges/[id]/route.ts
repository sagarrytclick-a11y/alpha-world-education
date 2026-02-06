import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Country from "@/models/Country";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const college = await College.findById(id);

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "College fetched successfully",
      data: college,
    });
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const { 
      name, 
      slug, 
      country_ref, 
      exams,
      // New comprehensive sections
      overview,
      key_highlights,
      why_choose_us,
      ranking,
      admission_process,
      documents_required,
      fees_structure,
      campus_highlights,
      // Legacy fields for backward compatibility
      fees, 
      duration, 
      establishment_year,
      ranking: legacyRanking,
      banner_url, 
      about_content, 
      is_active 
    } = body;

    const college = await College.findById(id);
    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    // Find country by slug to get ObjectId if country_ref is provided
    let countryObjectId = undefined;
    if (country_ref !== undefined) {
      const country = await Country.findOne({ slug: country_ref });
      if (!country) {
        return NextResponse.json(
          {
            success: false,
            message: "Country not found",
            error: `Country with slug '${country_ref}' not found`
          },
          { status: 400 }
        );
      }
      countryObjectId = country._id;
    }

    if (slug && slug !== college.slug) {
      const existingCollege = await College.findOne({ slug, _id: { $ne: id } });
      if (existingCollege) {
        return NextResponse.json(
          {
            success: false,
            message: "College with this slug already exists",
          },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    
    // Basic fields
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (countryObjectId !== undefined) updateData.country_ref = countryObjectId;
    if (exams !== undefined) updateData.exams = exams;
    
    // New comprehensive structure
    if (overview !== undefined) updateData.overview = overview;
    if (key_highlights !== undefined) updateData.key_highlights = key_highlights;
    if (why_choose_us !== undefined) updateData.why_choose_us = why_choose_us;
    if (ranking !== undefined) updateData.ranking = ranking;
    if (admission_process !== undefined) updateData.admission_process = admission_process;
    if (documents_required !== undefined) updateData.documents_required = documents_required;
    if (fees_structure !== undefined) updateData.fees_structure = fees_structure;
    if (campus_highlights !== undefined) updateData.campus_highlights = campus_highlights;
    
    // Legacy fields for backward compatibility
    if (fees !== undefined) updateData.fees = fees;
    if (duration !== undefined) updateData.duration = duration;
    if (establishment_year !== undefined) updateData.establishment_year = establishment_year;
    if (banner_url !== undefined) updateData.banner_url = banner_url;
    if (about_content !== undefined) updateData.about_content = about_content;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updatedCollege = await College.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "College updated successfully",
      data: updatedCollege,
    });
  } catch (error) {
    console.error("Error updating college:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const college = await College.findById(id);

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 }
      );
    }

    await College.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete college",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
