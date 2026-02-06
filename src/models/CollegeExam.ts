import mongoose, { Schema, Types } from "mongoose";

const CollegeExamSchema = new Schema({
  college_id: { type: Types.ObjectId, ref: "College" },
  exam_id: { type: Types.ObjectId, ref: "Exam" },
});

export default mongoose.models.CollegeExam ||
  mongoose.model("CollegeExam", CollegeExamSchema);
