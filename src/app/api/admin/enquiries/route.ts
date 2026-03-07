import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 [API] GET /api/admin/enquiries - Request received');
    
    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const priority = searchParams.get('priority') || '';

    console.log('🔗 [API] Connecting to database...');
    await connectDB();
    console.log('✅ [API] Database connected successfully');
    
    // Build filter object
    const filter: any = { is_active: true };
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    console.log(`📋 [API] Fetching enquiries with filter:`, filter);
    
    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Enquiry.countDocuments(filter);
    console.log(`📊 [API] Total enquiries found: ${total}`);
    
    // Get paginated enquiries
    const enquiries = await Enquiry.find(filter)
      .sort({ created_at: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance
    
    console.log(`✅ [API] Enquiries fetched: ${enquiries.length} enquiries for page ${page}`);
    
    // Transform the data to match the frontend interface
    const transformedEnquiries = enquiries.map(enquiry => ({
      _id: enquiry._id,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      city: enquiry.city,
      subject: enquiry.subject,
      message: enquiry.message,
      status: enquiry.status,
      priority: enquiry.priority,
      source: enquiry.source,
      assignedTo: enquiry.assignedTo,
      createdAt: enquiry.created_at,
      updatedAt: enquiry.updated_at
    }));
    
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      message: "Enquiries fetched successfully",
      data: transformedEnquiries,
      total,
      page,
      totalPages,
      hasMore: page < totalPages
    });
    
  } catch (error) {
    console.error('❌ [API] Error fetching enquiries:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch enquiries',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Enquiry ID is required' },
        { status: 400 }
      );
    }
    
    console.log(`🗑️ [API] DELETE /api/admin/enquiries - Deleting enquiry: ${id}`);
    
    await connectDB();
    
    // Soft delete by setting is_active to false
    const enquiry = await Enquiry.findByIdAndUpdate(
      id, 
      { is_active: false },
      { new: true }
    );
    
    if (!enquiry) {
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    console.log(`✅ [API] Enquiry deleted successfully: ${id}`);
    
    return NextResponse.json({
      success: true,
      message: "Enquiry deleted successfully"
    });
    
  } catch (error) {
    console.error('❌ [API] Error deleting enquiry:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete enquiry',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
