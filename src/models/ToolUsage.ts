import mongoose, { Schema, Types } from "mongoose";

const ToolUsageSchema = new Schema(
  {
    student_id: { type: Types.ObjectId, ref: "Student" },
    tool_name: String,
    input_data: Schema.Types.Mixed,
    result_data: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.ToolUsage ||
  mongoose.model("ToolUsage", ToolUsageSchema);
