import React, { useState } from "react";
import BlogEditor from "../../components/blogEditor/BlogEditor";
import CoverImageUploader from "../../components/blogEditor/CoverImage";
import { useUpload } from "../../hooks/useUpload";
import { createNewBlog } from "../../services/blogService";

const BLOG_CATEGORIES = [
  "Technology",
  "Travel",
  "Food",
  "Health",
  "Business",
  "Entertainment",
  "Education",
  "Lifestyle",
  "Personal",
  "Other",
];

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadImage } = useUpload();

  const handleBlogSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    if (!cover) {
      alert("Please select a cover image before publishing.");
      return;
    }

    if (!category && !customCategory.trim()) {
      alert("Please select or enter a category.");
      return;
    }

    if (!content.trim()) {
      alert("Please add some content to your blog post.");
      return;
    }

    setLoading(true);

    try {
      // Upload cover image
      const formData = new FormData();
      formData.append("image", cover, cover.name);

      const res = await uploadImage(formData);
      const imageURL = res?.imageUrl || null;

      if (!imageURL) {
        throw new Error("Cover image uploading failed!");
      }

      // Determine final category
      const finalCategory =
        category === "Other" ? customCategory.trim() : category;

      // Submit blog post
      const newBlog = {
        title,
        content,
        category: finalCategory,
        coverImage: imageURL,
        date: new Date(),
      };

      const response = await createNewBlog(newBlog);

      // Show success message or redirect
      alert("Blog published successfully!");

      // Reset form
      setTitle("");
      setCategory("");
      setCustomCategory("");
      setCover(null);
      setContent("");
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Error publishing blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-6 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-white border-b px-8 py-5">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Blog Post
        </h1>
        <p className="text-gray-500 mt-1">Share your thoughts with the world</p>
      </div>

      <div className="p-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Blog Details */}
          <div className="md:col-span-1 space-y-5">
            {/* Title Field */}
            <div className="bg-white">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a captivating title"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Category Field */}
            <div className="bg-white">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {BLOG_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {category === "Other" && (
                <div className="mt-2 bg-white">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category"
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}
            </div>

            {/* Cover Image Field */}
            <div className="bg-white pt-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image <span className="text-red-500">*</span>
              </label>
              <CoverImageUploader
                onCoverImageChange={(file) => setCover(file)}
              />
              {cover && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Image selected: {cover.name}
                </p>
              )}
            </div>

            {/* Submit Button moved here to avoid Quill editor overlap */}
            <div className="mt-6">
              <button
                onClick={handleBlogSubmit}
                disabled={loading}
                className="w-full px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Blog"
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Blog Editor */}
          <div className="md:col-span-2 bg-white">
            <BlogEditor content={content} onContentChange={setContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
