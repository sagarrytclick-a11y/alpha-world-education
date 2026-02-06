import mongoose, { Schema, Types } from "mongoose";

const ContentSchema = new Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    body: String,
    image: String,
    type: { type: String, enum: ["blog", "guide", "article"] },
    created_by: { type: Types.ObjectId, ref: "User" },
    is_published: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
