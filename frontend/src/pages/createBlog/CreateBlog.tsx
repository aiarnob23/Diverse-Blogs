import React, { useState } from "react";
import BlogEditor from "../../components/blogEditor/BlogEditor";
import CoverImageUploader from "../../components/blogEditor/CoverImage";
import { useUpload } from "../../hooks/useUpload";
import { createNewBlog } from "../../services/blogService";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("New Title");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { uploadImage } = useUpload();

  const handleBlogSubmit = async (content: string) => {
    if (!cover) {
      alert("Please select a cover image before publishing.");
      return;
    }

    setLoading(true);

    try {
      // Upload cover image
      const formData = new FormData();
      formData.append("image", cover, cover.name);

      const res = await uploadImage(formData);
      console.log(res);
      const imageURL = res?.imageUrl || null;

      if (!imageURL) {
        throw new Error("Cover image uploading failed!");
      }
      // Submit blog post
      const newBlog = {
        title,
        content,
        coverImage: imageURL,
        date: new Date(),
      };

      console.log(newBlog);

      const response = await createNewBlog(newBlog);
      console.log(response);
    } catch (error) {
      console.error("Error publishing blog:", error);
      alert("Error publishing blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="border p-2"
        />
      </div>
      <div>
        <CoverImageUploader onCoverImageChange={(file) => setCover(file)} />
      </div>
      <div>
        <BlogEditor onSubmit={handleBlogSubmit} />
      </div>
    </div>
  );
};

export default CreateBlog;
