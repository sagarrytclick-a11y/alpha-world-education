import mongoose from "mongoose";
import { generateSlug } from "@/lib/slug";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
    }],
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    related_exams: [{
      type: String,
    }],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
