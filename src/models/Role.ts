import mongoose, { Schema } from "mongoose";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["ADMIN", "PUBLISHER", "STUDENT"],
      required: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
