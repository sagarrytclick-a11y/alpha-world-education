import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;
    
    console.log(`🔄 [API] PATCH /api/admin/enquiries/${id} - Request body:`, body);
    
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }
    
    // Validate status values
    const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    console.log(`🔄 [API] PATCH /api/admin/enquiries/${id} - Updating status to: ${status}`);
    
    await connectDB();
    
    // First check if the enquiry exists
    const existingEnquiry = await Enquiry.findById(id);
    if (!existingEnquiry) {
      console.log(`❌ [API] Enquiry not found: ${id}`);
      return NextResponse.json(
        { success: false, error: 'Enquiry not found' },
        { status: 404 }
      );
    }
    
    console.log(`✅ [API] Found enquiry: ${existingEnquiry.name}, current status: ${existingEnquiry.status}`);
    
    // Update the enquiry
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { 
        status: status,
        $set: { updated_at: new Date() }
      },
      { 
        new: true, 
        runValidators: true,
        upsert: false
      }
    );
    
    if (!updatedEnquiry) {
      console.log(`❌ [API] Failed to update enquiry: ${id}`);
      return NextResponse.json(
        { success: false, error: 'Failed to update enquiry' },
        { status: 500 }
      );
    }
    
    console.log(`✅ [API] Enquiry status updated successfully: ${id} -> ${status}`);
    console.log(`📊 [API] Updated enquiry data:`, {
      _id: updatedEnquiry._id,
      status: updatedEnquiry.status,
      updated_at: updatedEnquiry.updated_at
    });
    
    return NextResponse.json({
      success: true,
      message: "Enquiry status updated successfully",
      data: {
        _id: updatedEnquiry._id,
        status: updatedEnquiry.status,
        updated_at: updatedEnquiry.updated_at
      }
    });
    
  } catch (error) {
    console.error('❌ [API] Error updating enquiry status:', error);
    console.error('❌ [API] Error stack:', error instanceof Error ? error.stack : 'No stack');
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update enquiry status',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
