import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onContentChange,
}) => {
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
    <div>
      <div className="bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blog Content <span className="text-red-500">*</span>
        </label>

        {/* Editor Section */}
        <div className="rounded-md mb-4">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={onContentChange}
            placeholder="Write your blog content here..."
            modules={modules}
            formats={formats}
            className="h-72" 
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
