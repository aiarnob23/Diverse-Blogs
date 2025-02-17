import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import default Quill styles

interface BlogEditorProps {
  onSubmit: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSubmit }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(content);
    onSubmit(content); // Pass content to the parent
  };

  const modules = {
    toolbar: [
      [{ font: [] }, { size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "list",
    "bullet",
    "indent",
    "align",
    "color",
    "background",
    "link",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Write your story{" "}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Write your blog content here..."
              modules={modules}
              formats={formats}
              className="h-56 mb-6 border rounded-lg"
            />
          </div>
          <div className="text-right relative z-10">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all"
            >
              Publish
            </button>
          </div>
        </form>

        {/* Preview Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Preview</h3>
          <div
            className="prose prose-lg max-w-none bg-gray-50 p-6 border rounded-lg shadow-inner"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
