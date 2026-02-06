import Link from "next/link";
import {
  MapPin,
  Award,
  DollarSign,
  Star,
  Users,
  CheckCircle,
} from "lucide-react";
import { useFormModal } from "@/context/FormModalContext";

type CollegeCardProps = {
  data: {
    _id: string;
    name: string;
    slug?: string;
    banner_url?: string;
    location?: string;
    rank?: string;
    tuition?: string;
    acceptance?: string;
    rating?: string;
    employability?: string;
    tags?: string[];
  };
};

export default function CollegeCard({ data }: CollegeCardProps) {
  const { openModal } = useFormModal();
  
  const getImageSrc = (image?: string) => {
    if (!image) return null;
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return image;
    return `/uploads/colleges/${image}`;
  };

  const imageUrl = getImageSrc(data.banner_url) || 
    "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=600";

  const slug = data.slug || data._id;

  const handleApplyNow = () => {
    openModal();
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-green-200">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={data.name || "College"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Rank Badge */}
        {data.rank && (
          <div className="absolute left-4 top-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-lg">
            {data.rank}
          </div>
        )}

        {/* Scholarship Badge */}
        {data.tags?.includes("Scholarship") && (
          <div className="absolute right-4 top-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
            💰 Scholarship
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 border border-green-100"
              >
                <CheckCircle size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title & Location */}
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
          {data.name}
        </h3>

        {data.location && (
          <div className="flex items-center gap-2 text-slate-600 mb-4">
            <MapPin size={16} className="text-green-500" />
            <span className="text-sm font-medium">{data.location}</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {data.tuition && (
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              <div>
                <p className="text-xs text-slate-500">Tuition</p>
                <p className="text-sm font-bold text-slate-900">
                  {data.tuition}
                </p>
              </div>
            </div>
          )}

          {data.acceptance && (
            <div className="flex items-center gap-2">
              <Award size={16} className="text-green-500" />
              <div>
                <p className="text-xs text-slate-500">Acceptance</p>
                <p className="text-sm font-bold text-slate-900">
                  {data.acceptance}
                </p>
              </div>
            </div>
          )}

          {data.employability && (
            <div className="flex items-center gap-2">
              <Users size={16} className="text-green-500" />
              <div>
                <p className="text-xs text-slate-500">Employability</p>
                <p className="text-sm font-bold text-slate-900">
                  {data.employability}
                </p>
              </div>
            </div>
          )}

          {data.rating && (
            <div className="flex items-center gap-2">
              <Star size={16} className="text-green-500 fill-green-500" />
              <div>
                <p className="text-xs text-slate-500">Rating</p>
                <p className="text-sm font-bold text-slate-900">
                  {data.rating}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/colleges/${slug}`}
            className="flex-1 border-2 border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition-all duration-200 text-center"
          >
            View Details
          </Link>

          <button
            onClick={handleApplyNow}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg text-center"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
