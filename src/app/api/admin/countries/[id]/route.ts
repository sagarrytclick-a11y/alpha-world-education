import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Country from "@/models/Country";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const country = await Country.findById(id);

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Country fetched successfully",
      data: country,
    });
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    const { name, slug, flag, description, meta_title, meta_description, is_active } = body;

    const country = await Country.findById(id);
    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country not found",
        },
        { status: 404 }
      );
    }

    if (slug && slug !== country.slug) {
      const existingCountry = await Country.findOne({ slug, _id: { $ne: id } });
      if (existingCountry) {
        return NextResponse.json(
          {
            success: false,
            message: "Country with this slug already exists",
          },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (flag !== undefined) updateData.flag = flag;
    if (description !== undefined) updateData.description = description;
    if (meta_title !== undefined) updateData.meta_title = meta_title;
    if (meta_description !== undefined) updateData.meta_description = meta_description;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: "Country updated successfully",
      data: updatedCountry,
    });
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update country",
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
    const country = await Country.findById(id);

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          message: "Country not found",
        },
        { status: 404 }
      );
    }

    await Country.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Country deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete country",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
