import { useState } from "react";
import { useCookies } from "react-cookie";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import Modal from "../modal/Modal";
import Profiles from "../profiles/Profiles";

export default function Blog({ blog }: { blog: any }) {
  const [cookies] = useCookies(["email"]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileEmail, setProfileEmail] = useState<any>(null);

  //handle modal view for author details
  const handleAuthorClick = () => {
    setProfileEmail(blog?.authorEmail);
    setIsModalOpen(true);
  }

  return (
    <div>
    <div className="max-w-3xl border-2  mx-auto p-6 bg-white rounded-xl shadow-xl space-y-6">
      {/* Cover Image */}
      <div className="">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
        <div className=" text-white font-extrabold text-4xl bg-black bg-opacity-50 px-4 py-2 rounded-lg shadow-md">
          {blog.title}
        </div>
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        <p
          className="text-lg text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Author and Date */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
        <span className="font-semibold text-blue-500 cursor-pointer" onClick={handleAuthorClick}>{blog.authorName}</span>
        <span className="font-light">
          {new Date(blog.date).toLocaleDateString()}
        </span>
      </div>

      {/* Buttons */}
      {cookies.email === blog?.authorEmail && (
        <div className="mt-8 flex justify-center gap-6">
          <button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
            <FaEdit className="text-xl" />
            Edit
          </button>
          <button className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 py-2 px-6 rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105">
            <FaTrashAlt className="text-xl" />
            Delete
          </button>
        </div>
      )}
    </div>
    <div>

      {/* Modals for authors info view */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        {
          profileEmail && <Profiles email={profileEmail} />
         }
      </Modal>
    </div>
    </div>
  );
}
