import mongoose from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
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
    short_name: {
      type: String,
      required: true,
    },
    exam_type: {
      type: String,
      required: true,
      enum: ["National", "State", "University", "International"],
    },
    conducting_body: {
      type: String,
      required: true,
    },
    exam_mode: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Hybrid"],
    },
    frequency: {
      type: String,
      required: true,
      enum: ["Once a year", "Twice a year", "Quarterly", "Monthly"],
    },
    description: {
      type: String,
      required: true,
    },

    // Hero Section
    hero_section: {
      title: { type: String, required: true },
      subtitle: { type: String },
      image: { type: String }
    },

    // Overview
    overview: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      key_highlights: [{ type: String }]
    },

    // Registration
    registration: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String },
      bullet_points: [{ type: String }]
    },

    // Exam Pattern
    exam_pattern: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      total_duration_mins: { type: Number, required: true },
      score_range: { type: String, required: true },
      table_data: [{
        section: { type: String, required: true },
        questions: { type: Number, required: true },
        duration_mins: { type: Number, required: true }
      }]
    },

    // Exam Dates
    exam_dates: {
      title: { type: String, required: true },
      important_dates: [{
        event: { type: String, required: true },
        date: { type: Date, required: true }
      }]
    },

    // Result Statistics
    result_statistics: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      passing_criteria: { type: String, required: true },
      total_marks: { type: Number, required: true },
      passing_marks: { type: Number, required: true }
    },

    // Status
    is_active: {
      type: Boolean,
      default: true,
    },
    display_order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Exam || mongoose.model("Exam", ExamSchema);