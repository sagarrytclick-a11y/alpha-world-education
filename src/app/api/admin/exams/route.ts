import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Exam from "@/models/Exam";

export async function GET() {
  try {
    await connectDB();
    const exams = await Exam.find({}).sort({ display_order: 1, name: 1 });
    
    return NextResponse.json({
      success: true,
      message: "Exams fetched successfully",
      data: exams,
    });
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    console.log('📥 POST /api/admin/exams - Received data:', JSON.stringify(body, null, 2));

    const { 
      name, 
      slug, 
      short_name, 
      image_url,
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
    if (!name?.trim()) errors.push("name is required");
    if (!slug?.trim()) errors.push("slug is required");
    if (!short_name?.trim()) errors.push("short_name is required");
    if (!exam_type?.trim()) errors.push("exam_type is required");
    if (!conducting_body?.trim()) errors.push("conducting_body is required");
    if (!exam_mode?.trim()) errors.push("exam_mode is required");
    if (!frequency?.trim()) errors.push("frequency is required");
    if (!description?.trim()) errors.push("description is required");

    // Hero Section validation
    if (!hero_section?.title?.trim()) errors.push("hero_section.title is required");

    // Overview validation
    if (!overview?.title?.trim()) errors.push("overview.title is required");
    if (!overview?.content?.trim()) errors.push("overview.content is required");

    // Registration validation
    if (!registration?.title?.trim()) errors.push("registration.title is required");
    if (!registration?.description?.trim()) errors.push("registration.description is required");

    // Exam Pattern validation
    if (!exam_pattern?.title?.trim()) errors.push("exam_pattern.title is required");
    if (!exam_pattern?.description?.trim()) errors.push("exam_pattern.description is required");
    if (!exam_pattern?.total_duration_mins || exam_pattern.total_duration_mins <= 0) {
      errors.push("exam_pattern.total_duration_mins must be greater than 0");
    }
    if (!exam_pattern?.score_range?.trim()) errors.push("exam_pattern.score_range is required");
    if (!exam_pattern?.table_data || exam_pattern.table_data.length === 0) {
      errors.push("exam_pattern.table_data is required");
    } else {
      // Validate each table_data entry
      exam_pattern.table_data.forEach((item: any, index: number) => {
        if (!item?.section?.trim()) errors.push(`exam_pattern.table_data[${index}].section is required`);
        if (!item?.questions || item.questions <= 0) errors.push(`exam_pattern.table_data[${index}].questions must be greater than 0`);
        if (!item?.duration_mins || item.duration_mins <= 0) errors.push(`exam_pattern.table_data[${index}].duration_mins must be greater than 0`);
      });
    }

    // Exam Dates validation
    if (!exam_dates?.title?.trim()) errors.push("exam_dates.title is required");
    if (!exam_dates?.important_dates || exam_dates.important_dates.length === 0) {
      errors.push("exam_dates.important_dates is required");
    } else {
      // Validate each important_dates entry
      exam_dates.important_dates.forEach((item: any, index: number) => {
        if (!item?.event?.trim()) errors.push(`exam_dates.important_dates[${index}].event is required`);
        if (!item?.date) errors.push(`exam_dates.important_dates[${index}].date is required`);
      });
    }

    // Result Statistics validation
    if (!result_statistics?.title?.trim()) errors.push("result_statistics.title is required");
    if (!result_statistics?.description?.trim()) errors.push("result_statistics.description is required");
    if (!result_statistics?.passing_criteria?.trim()) errors.push("result_statistics.passing_criteria is required");
    if (!result_statistics?.total_marks || result_statistics.total_marks <= 0) {
      errors.push("result_statistics.total_marks must be greater than 0");
    }
    if (!result_statistics?.passing_marks || result_statistics.passing_marks < 0) {
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

    const existingExam = await Exam.findOne({ slug });
    if (existingExam) {
      return NextResponse.json(
        {
          success: false,
          message: "Exam with this slug already exists",
        },
        { status: 409 }
      );
    }

    const exam = new Exam({
      name,
      slug,
      short_name,
      image_url: image_url || "",
      exam_type,
      conducting_body,
      exam_mode,
      frequency,
      description,
      is_active: is_active !== undefined ? is_active : true,
      display_order: display_order || 0,
      hero_section,
      overview,
      registration,
      exam_pattern,
      exam_dates,
      result_statistics
    });

    console.log('💾 Saving exam to database...');
    await exam.save();
    console.log('✅ Exam saved successfully:', exam._id);

    return NextResponse.json({
      success: true,
      message: "Exam created successfully",
      data: exam,
    });
  } catch (error) {
    console.error("❌ Error creating exam:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create exam",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
