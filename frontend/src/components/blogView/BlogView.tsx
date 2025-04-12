import { useState } from "react";
import { useCookies } from "react-cookie";
import {
  FaEdit,
  FaCalendarAlt,
  FaBookmark,
  FaShareAlt,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import Modal from "../modal/Modal";
import Profiles from "../profiles/Profiles";
import { Link } from "react-router-dom";

export default function Blog({ blog }: { blog: any }) {
  const [cookies] = useCookies(["email"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileEmail, setProfileEmail] = useState<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  //handle modal view for author details
  const handleAuthorClick = () => {
    setProfileEmail(blog?.authorEmail);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Banner & Title Section */}
          <div className="relative">
            <div className="relative h-96 overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              {/* Category */}
              <div className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4 shadow-lg">
                {blog.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {blog.title}
              </h1>

              {/* Author and Date */}
              <div className="flex items-center text-white space-x-6">
                <div
                  className="flex items-center space-x-2 cursor-pointer hover:text-blue-300 transition-colors duration-200"
                  onClick={handleAuthorClick}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-lg font-bold border-2 border-white">
                    {blog.authorName?.charAt(0)}
                  </div>
                  <span className="font-medium">{blog.authorName}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaCalendarAlt />
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section with alternating backgrounds */}
          <div className="px-8 md:px-16 py-10 bg-white">
            {/* Social sharing & actions bar */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full ${
                    isLiked
                      ? "text-white bg-red-500 border-red-500"
                      : "text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200"
                  } transition-colors duration-200 border`}
                >
                  <FaHeart className={isLiked ? "text-white" : ""} />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>

                <button className="flex items-center space-x-1 px-4 py-2 rounded-full text-gray-700 bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors duration-200">
                  <FaComment />
                  <span>Comment</span>
                </button>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-2 rounded-full ${
                    isSaved
                      ? "text-white bg-blue-600"
                      : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-200`}
                >
                  <FaBookmark className="text-lg" />
                </button>

                <button className="p-2 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                  <FaShareAlt className="text-lg" />
                </button>
              </div>
            </div>

            {/* Blog content with visual enhancements */}
            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600">
              <div
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </article>

            {/* Tags with improved visual styling */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Related Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author info card with distinct background */}
          <div className="px-8 md:px-16 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-b border-gray-200">
            <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
              About the Author
            </h4>
            <div className="flex items-start space-x-4">
              <div
                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold cursor-pointer border-2 border-white shadow-md"
                onClick={handleAuthorClick}
              >
                {blog.authorName?.charAt(0)}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors duration-200"
                  onClick={handleAuthorClick}
                >
                  {blog.authorName}
                </h3>
                {blog.authorBio && (
                  <p className="mt-1 text-gray-700">
                    {blog.authorBio ||
                      "Professional content creator and industry expert."}
                  </p>
                )}
                <div className="mt-3">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    onClick={handleAuthorClick}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action bar with improved contrast */}
          {cookies.email === blog?.authorEmail && (
            <div className="px-8 md:px-16 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <Link
                  to={`/user/edit-blog/${blog._id}`}
                  className="flex items-center gap-2 text-blue-700 bg-blue-50 hover:bg-blue-100 px-6 py-3 rounded-lg shadow-sm transition-all duration-200 border border-blue-200"
                >
                  <FaEdit />
                  <span className="font-medium">Edit Article</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal for author info view */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {profileEmail && <Profiles email={profileEmail} />}
      </Modal>
    </div>
  );
}
