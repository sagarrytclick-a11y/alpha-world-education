import mongoose, { Schema, Types } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      default: 'General Enquiry'
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved', 'closed'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    source: {
      type: String,
      enum: ['contact-form', 'website', 'email', 'phone', 'other'],
      default: 'contact-form'
    },
    assignedTo: {
      type: String,
      default: null
    },
    related_college_id: { 
      type: Types.ObjectId, 
      ref: "College" 
    },
    related_exam_id: { 
      type: Types.ObjectId, 
      ref: "Exam" 
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  { 
    timestamps: { 
      createdAt: "created_at", 
      updatedAt: "updated_at" 
    } 
  }
);

// Create indexes for better query performance
EnquirySchema.index({ email: 1 })
EnquirySchema.index({ status: 1 })
EnquirySchema.index({ priority: 1 })
EnquirySchema.index({ created_at: -1 })

export default mongoose.models.Enquiry ||
  mongoose.model("Enquiry", EnquirySchema);
