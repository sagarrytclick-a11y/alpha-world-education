import { connectDB } from "@/lib/db";
import College from "@/models/College";

export async function getCollegeBySlug(slug: string): Promise<any | null> {
  try {
    console.log("🔍 Fetching college with slug:", slug);
    
    await connectDB();
    console.log("✅ Database connected successfully");

    const college = await College.findOne({ slug, is_active: true })
      .populate("country_ref")
      .lean();

    console.log("📊 College query result:", college ? "Found" : "Not found");
    
    if (!college) {
      console.log("❌ No college found with slug:", slug);
      return null;
    }

    return {
      ...college,
      _id: college._id.toString(),

      createdAt: college.createdAt?.toISOString?.(),
      updatedAt: college.updatedAt?.toISOString?.(),

      country_ref: college.country_ref
        ? {
            ...college.country_ref,
            _id: college.country_ref._id.toString(),
            createdAt: college.country_ref.createdAt?.toISOString?.(),
            updatedAt: college.country_ref.updatedAt?.toISOString?.(),
          }
        : null,
    };
  } catch (error) {
    console.error("💥 Error fetching college by slug:", error);
    console.error("💥 Error details:", {
      slug,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new Error("Failed to fetch college data");
  }
}
