"use client";

import { useState } from "react";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";

interface CollegeFormData {
  name: string;
  location: string;
  rank: string;
  ranking: string;
  establishment_year: string;
  tuition: string;
  acceptance: string;
  rating: string;
  employability: string;
  tags: string;
  status: string;
  banner_url?: string;
}

interface CollegeFormProps {
  initialData?: Partial<CollegeFormData>;
  onSubmit: (data: CollegeFormData, images: File[]) => void;
  isLoading?: boolean;
}

export default function CollegeForm({ initialData, onSubmit, isLoading = false }: CollegeFormProps) {
  const [formData, setFormData] = useState<CollegeFormData>({
    name: "",
    location: "",
    rank: "",
    ranking: "",
    establishment_year: "",
    tuition: "",
    acceptance: "",
    rating: "",
    employability: "",
    tags: "",
    status: "Active",
    banner_url: "",
    ...initialData,
  });

  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerImagePreview, setBannerImagePreview] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type) || file.size > maxSize) {
        alert('Invalid image. Only JPEG, PNG, and WebP images under 5MB are allowed.');
        return;
      }

      setBannerImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    setBannerImagePreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allImages = bannerImage ? [bannerImage] : [];
    onSubmit(formData, allImages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cover Image Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Cover Image *
        </label>
        <div className="flex items-center gap-4">
          {bannerImagePreview ? (
            <div className="relative w-32 h-32 border-2 border-green-500 rounded-lg overflow-hidden">
              <img
                src={bannerImagePreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={removeBannerImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition-colors">
              <ImageIcon size={24} className="text-slate-400 mb-2" />
              <span className="text-sm text-slate-600">Cover Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerImageChange}
                className="hidden"
              />
            </label>
          )}
          <div className="flex-1">
            <p className="text-sm text-slate-600">
              This will be the main cover image displayed for the college.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              JPEG, PNG, WebP • Max 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Image URL Input */}
      <div>
        <label htmlFor="banner_url" className="block text-sm font-medium text-slate-700 mb-2">
          Or Add Cover Image URL
        </label>
        <div className="flex gap-4">
          <input
            type="url"
            id="banner_url"
            name="banner_url"
            value={formData.banner_url}
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://example.com/image.jpg"
          />
          <button
            type="button"
            onClick={() => {
              if (formData.banner_url) {
                setBannerImagePreview(formData.banner_url);
                setBannerImage(null);
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            disabled={!formData.banner_url}
          >
            Preview URL
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Enter a direct image URL to use instead of uploading
        </p>
      </div>


      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            College Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter college name"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label htmlFor="rank" className="block text-sm font-medium text-slate-700 mb-1">
            Rank
          </label>
          <input
            type="text"
            id="rank"
            name="rank"
            value={formData.rank}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., #1 in Country"
          />
        </div>

        <div>
          <label htmlFor="ranking" className="block text-sm font-medium text-slate-700 mb-1">
            College Ranking
          </label>
          <input
            type="text"
            id="ranking"
            name="ranking"
            value={formData.ranking}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 150th nationally, 500th globally"
          />
        </div>

        <div>
          <label htmlFor="establishment_year" className="block text-sm font-medium text-slate-700 mb-1">
            Establishment Year
          </label>
          <input
            type="text"
            id="establishment_year"
            name="establishment_year"
            value={formData.establishment_year}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 1850, 1995"
          />
        </div>

        <div>
          <label htmlFor="tuition" className="block text-sm font-medium text-slate-700 mb-1">
            Tuition Fees
          </label>
          <input
            type="text"
            id="tuition"
            name="tuition"
            value={formData.tuition}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., $15,000/year"
          />
        </div>

        <div>
          <label htmlFor="acceptance" className="block text-sm font-medium text-slate-700 mb-1">
            Acceptance Rate
          </label>
          <input
            type="text"
            id="acceptance"
            name="acceptance"
            value={formData.acceptance}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 25% or Selective"
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-slate-700 mb-1">
            Rating
          </label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 4.5/5"
          />
        </div>

        <div>
          <label htmlFor="employability" className="block text-sm font-medium text-slate-700 mb-1">
            Employability Rate
          </label>
          <input
            type="text"
            id="employability"
            name="employability"
            value={formData.employability}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., 95% within 6 months"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-1">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="e.g., Engineering, Business, Scholarship (comma-separated)"
        />
        <p className="text-xs text-slate-500 mt-1">
          Separate multiple tags with commas
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !formData.name}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating College...
            </>
          ) : (
            <>
              <Plus size={16} />
              Create College
            </>
          )}
        </button>
      </div>
    </form>
  );
}
