import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
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

    const { 
      title, 
      slug, 
      category, 
      tags, 
      content, 
      image,
      related_exams, 
      is_active 
    } = body;

    if (!title || !slug || !category || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: title, slug, category, content",
        },
        { status: 400 }
      );
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    const blog = new Blog({
      title,
      slug,
      category,
      tags: tags || [],
      content,
      image: image || '',
      related_exams: related_exams || [],
      is_active: is_active !== undefined ? is_active : true,
    });

    await blog.save();

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
