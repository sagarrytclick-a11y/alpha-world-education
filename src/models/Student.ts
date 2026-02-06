import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password_hash: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
