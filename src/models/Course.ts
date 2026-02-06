import mongoose, { Schema, Types } from "mongoose";

const CourseSchema = new Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    duration: String,
    eligibility: String,
    career_scope: String,
    college: String,
    level: String,
    fees: String,
    category: String,
    description: String,
    is_active: { type: Boolean, default: true },
    created_by: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Course ||
  mongoose.model("Course", CourseSchema);
