import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    // Build filter object
    const filter: any = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    
    if (status && status !== 'all') {
      filter.is_active = status === 'published';
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Blog.countDocuments(filter);
    
    // Get paginated blogs
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
      total,
      page,
      totalPages,
      hasMore: page < totalPages
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
