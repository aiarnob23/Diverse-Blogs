import { useEffect, useState } from "react";
import { useFetchBlogs } from "../../hooks/useFetchBlogs";
import BlogSkeleton from "../skeletons/BlogListSkeleton";
import { BlogCategories } from "../../utils/blogCategories";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import { Calendar, User, Clock, Tag } from 'lucide-react';

export default function BlogList({category} : {category : any}) {
  const { getBlogs, blogs, loading, error } = useFetchBlogs();
  const categories = BlogCategories;
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(category);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogPerPage = 18;

  useEffect(() => {
    const getAllBlogs = async () => {
      let category = activeCategory !== "All" ? activeCategory : "";
      const response = await getBlogs(category, currentPage, blogPerPage);
      if (response) {
        setTotalPages(Math.ceil(+response / blogPerPage));
      }
    };
    getAllBlogs();
  }, [activeCategory, currentPage]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(dateString));
  };

  const sanitizeHtml = (html: string) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  if (loading) return <BlogSkeleton />;
  if (error) return <p className="text-red-500 text-center py-8">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
      {/* Header */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Our Blog
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Discover insights, stories, and knowledge across various topics
        </p>
      </div>

      {/* Categories */}
      <div className="mb-8 lg:mb-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">
          Browse by Category
        </h3>
        <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start flex-wrap">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCategory(category ? category : "All");
                setCurrentPage(1);
              }}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                {category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Blog Lists */}
      {blogs?.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {blogs.map((blog: any, index: number) => (
              <article
                onClick={() => navigate(`/user/blog/${blog?._id}`)}
                key={index}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 sm:h-52 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white shadow-lg">
                      <Tag className="w-3 h-3" />
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>5 min read</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {blog.title}
                  </h2>

                  {/* Author */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      By <span className="font-medium text-gray-900">{blog.authorName}</span>
                    </span>
                  </div>

                  {/* Excerpt */}
                  <div
                    className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={sanitizeHtml(blog.content)}
                  />

                  {/* Read more indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
                      Read full article →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-12 lg:py-20">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
            <p className="text-gray-600">
              We couldn't find any blogs in this category. Try selecting a different category or check back later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}