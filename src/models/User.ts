import mongoose, { Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    // Auth & role
    role: {
      type: String,
      enum: ["ADMIN", "PUBLISHER", "STUDENT"],
      required: true,
    },

    // Basic info
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },

    // Onboarding fields (FROM UI)
    country: { type: String },
    field_of_study: { type: String },
    level: { type: String },
    english_test: { type: Boolean, default: false },
    funds: { type: Number, default: 0 },
    wants_loan: { type: Boolean, default: false },

    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
