import mongoose, { Schema, Types } from "mongoose";

const CourseExamSchema = new Schema({
  course_id: { type: Types.ObjectId, ref: "Course" },
  exam_id: { type: Types.ObjectId, ref: "Exam" },
});

export default mongoose.models.CourseExam ||
  mongoose.model("CourseExam", CourseExamSchema);
