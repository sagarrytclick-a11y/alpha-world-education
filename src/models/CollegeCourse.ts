import mongoose, { Schema, Types } from "mongoose";

const CollegeCourseSchema = new Schema({
  college_id: { type: Types.ObjectId, ref: "College" },
  course_id: { type: Types.ObjectId, ref: "Course" },
});

export default mongoose.models.CollegeCourse ||
  mongoose.model("CollegeCourse", CollegeCourseSchema);
