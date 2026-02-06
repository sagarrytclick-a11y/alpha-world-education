import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const exam = await Exam.findById(id);

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Exam fetched successfully",
      data: exam,
    });
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await request.json();
    
    console.log('📥 PUT /api/admin/exams/[id] - Received data:', JSON.stringify(body, null, 2));
    
    const { 
      name, 
      slug, 
      short_name, 
      exam_type, 
      conducting_body, 
      exam_mode, 
      frequency, 
      description, 
      is_active, 
      display_order,
      hero_section,
      overview,
      registration,
      exam_pattern,
      exam_dates,
      result_statistics
    } = body;

    // Comprehensive validation for all required fields
    const errors = [];

    // Basic Info validation
    if (name !== undefined && !name?.trim()) errors.push("name is required");
    if (slug !== undefined && !slug?.trim()) errors.push("slug is required");
    if (short_name !== undefined && !short_name?.trim()) errors.push("short_name is required");
    if (exam_type !== undefined && !exam_type?.trim()) errors.push("exam_type is required");
    if (conducting_body !== undefined && !conducting_body?.trim()) errors.push("conducting_body is required");
    if (exam_mode !== undefined && !exam_mode?.trim()) errors.push("exam_mode is required");
    if (frequency !== undefined && !frequency?.trim()) errors.push("frequency is required");
    if (description !== undefined && !description?.trim()) errors.push("description is required");

    // Hero Section validation
    if (hero_section?.title !== undefined && !hero_section.title?.trim()) errors.push("hero_section.title is required");

    // Overview validation
    if (overview?.title !== undefined && !overview.title?.trim()) errors.push("overview.title is required");
    if (overview?.content !== undefined && !overview.content?.trim()) errors.push("overview.content is required");

    // Registration validation
    if (registration?.title !== undefined && !registration.title?.trim()) errors.push("registration.title is required");
    if (registration?.description !== undefined && !registration.description?.trim()) errors.push("registration.description is required");

    // Exam Pattern validation
    if (exam_pattern?.title !== undefined && !exam_pattern.title?.trim()) errors.push("exam_pattern.title is required");
    if (exam_pattern?.description !== undefined && !exam_pattern.description?.trim()) errors.push("exam_pattern.description is required");
    if (exam_pattern?.total_duration_mins !== undefined && (!exam_pattern.total_duration_mins || exam_pattern.total_duration_mins <= 0)) {
      errors.push("exam_pattern.total_duration_mins must be greater than 0");
    }
    if (exam_pattern?.score_range !== undefined && !exam_pattern.score_range?.trim()) errors.push("exam_pattern.score_range is required");
    if (exam_pattern?.table_data !== undefined) {
      if (!exam_pattern.table_data || exam_pattern.table_data.length === 0) {
        errors.push("exam_pattern.table_data is required");
      } else {
        // Validate each table_data entry
        exam_pattern.table_data.forEach((item: any, index: number) => {
          if (!item?.section?.trim()) errors.push(`exam_pattern.table_data[${index}].section is required`);
          if (!item?.questions || item.questions <= 0) errors.push(`exam_pattern.table_data[${index}].questions must be greater than 0`);
          if (!item?.duration_mins || item.duration_mins <= 0) errors.push(`exam_pattern.table_data[${index}].duration_mins must be greater than 0`);
        });
      }
    }

    // Exam Dates validation
    if (exam_dates?.title !== undefined && !exam_dates.title?.trim()) errors.push("exam_dates.title is required");
    if (exam_dates?.important_dates !== undefined) {
      if (!exam_dates.important_dates || exam_dates.important_dates.length === 0) {
        errors.push("exam_dates.important_dates is required");
      } else {
        // Validate each important_dates entry
        exam_dates.important_dates.forEach((item: any, index: number) => {
          if (!item?.event?.trim()) errors.push(`exam_dates.important_dates[${index}].event is required`);
          if (!item?.date) errors.push(`exam_dates.important_dates[${index}].date is required`);
        });
      }
    }

    // Result Statistics validation
    if (result_statistics?.title !== undefined && !result_statistics.title?.trim()) errors.push("result_statistics.title is required");
    if (result_statistics?.description !== undefined && !result_statistics.description?.trim()) errors.push("result_statistics.description is required");
    if (result_statistics?.passing_criteria !== undefined && !result_statistics.passing_criteria?.trim()) errors.push("result_statistics.passing_criteria is required");
    if (result_statistics?.total_marks !== undefined && (!result_statistics.total_marks || result_statistics.total_marks <= 0)) {
      errors.push("result_statistics.total_marks must be greater than 0");
    }
    if (result_statistics?.passing_marks !== undefined && (!result_statistics.passing_marks || result_statistics.passing_marks < 0)) {
      errors.push("result_statistics.passing_marks must be 0 or greater");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: errors,
        },
        { status: 400 }
      );
    }

    const exam = await Exam.findById(id);
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    if (slug && slug !== exam.slug) {
      const existingExam = await Exam.findOne({ slug, _id: { $ne: id } });
      if (existingExam) {
        return NextResponse.json(
          {
            success: false,
            message: "Exam with this slug already exists",
          },
          { status: 409 }
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (slug !== undefined) updateData.slug = slug;
    if (short_name !== undefined) updateData.short_name = short_name;
    if (exam_type !== undefined) updateData.exam_type = exam_type;
    if (conducting_body !== undefined) updateData.conducting_body = conducting_body;
    if (exam_mode !== undefined) updateData.exam_mode = exam_mode;
    if (frequency !== undefined) updateData.frequency = frequency;
    if (description !== undefined) updateData.description = description;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (display_order !== undefined) updateData.display_order = display_order;
    if (hero_section !== undefined) updateData.hero_section = hero_section;
    if (overview !== undefined) updateData.overview = overview;
    if (registration !== undefined) updateData.registration = registration;
    if (exam_pattern !== undefined) updateData.exam_pattern = exam_pattern;
    if (exam_dates !== undefined) updateData.exam_dates = exam_dates;
    if (result_statistics !== undefined) updateData.result_statistics = result_statistics;

    console.log('💾 Updating exam in database...');
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    console.log('✅ Exam updated successfully:', updatedExam._id);

    return NextResponse.json({
      success: true,
      message: "Exam updated successfully",
      data: updatedExam,
    });
  } catch (error) {
    console.error("❌ Error updating exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update exam",
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
    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam not found",
        },
        { status: 404 }
      );
    }

    await Exam.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
