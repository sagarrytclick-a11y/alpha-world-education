import mongoose from "mongoose";
import { generateSlug } from "@/lib/slug";

const CollegeSchema = new mongoose.Schema(
  {
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
    country_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    exams: [{
      type: String,
    }],
    
    // Overview Section
    overview: {
      title: {
        type: String,
        default: "Overview"
      },
      description: {
        type: String,
        required: true,
      }
    },

    // Key Highlights Section
    key_highlights: {
      title: {
        type: String,
        default: "Key Highlights"
      },
      description: {
        type: String,
        required: true,
      },
      features: [{
        type: String,
      }]
    },

    // Why Choose Us Section
    why_choose_us: {
      title: {
        type: String,
        default: "Why Choose Us"
      },
      description: {
        type: String,
        required: true,
      },
      features: [{
        title: String,
        description: String
      }]
    },

    // Ranking & Recognition Section
    ranking: {
      title: {
        type: String,
        default: "Ranking & Recognition"
      },
      description: {
        type: String,
        required: true,
      },
      country_ranking: String,
      world_ranking: String,
      accreditation: [String]
    },

    // Admission Process Section
    admission_process: {
      title: {
        type: String,
        default: "Admission Process"
      },
      description: {
        type: String,
        required: true,
      },
      steps: [{
        type: String,
      }]
    },

    // Documents Required Section
    documents_required: {
      title: {
        type: String,
        default: "Documents Required"
      },
      description: {
        type: String,
        required: true,
      },
      documents: [{
        type: String,
      }]
    },

    // Fees Structure Section
    fees_structure: {
      title: {
        type: String,
        default: "Fees Structure"
      },
      description: {
        type: String,
        required: true,
      },
      courses: [{
        course_name: String,
        duration: String,
        annual_tuition_fee: String
      }]
    },

    // Campus Highlights Section
    campus_highlights: {
      title: {
        type: String,
        default: "Campus Highlights"
      },
      description: {
        type: String,
        required: true,
      },
      highlights: [{
        type: String,
      }]
    },

    // Legacy fields for backward compatibility
    fees: {
      type: Number,
    },
    duration: {
      type: String,
    },
    establishment_year: {
      type: String,
    },
    legacy_ranking: {
      type: String,
    },
    banner_url: {
      type: String,
    },
    about_content: {
      type: String,
    },
    
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

export default mongoose.models.College ||
  mongoose.model("College", CollegeSchema);
