// CoverImage.tsx
import React, { useState } from "react";

interface CoverImageUploaderProps {
  onCoverImageChange: (file: File | null) => void;
}

const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({
  onCoverImageChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 630;
  const MAX_SIZE = 300 * 1024; // 300 KB

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);

      img.onload = () => {
        // Check if the image exceeds the maximum allowed dimensions
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          reject(
            `Image exceeds the maximum allowed dimensions of ${MAX_WIDTH}x${MAX_HEIGHT}px.`
          );
          URL.revokeObjectURL(objectURL);
          return;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const scaleFactor = Math.min(
            MAX_WIDTH / img.width,
            MAX_HEIGHT / img.height
          );
          const width = img.width * scaleFactor;
          const height = img.height * scaleFactor;

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: blob.type,
                });

                // Check if the resized image exceeds the maximum size
                if (resizedFile.size > MAX_SIZE) {
                  reject(`Image exceeds the maximum size of 300KB.`);
                  return;
                }

                resolve(resizedFile);
              } else {
                reject("Image resizing failed.");
              }
              URL.revokeObjectURL(objectURL);
            },
            "image/jpeg",
            0.8 // Adjust the quality as needed
          );
        }
      };

      img.onerror = () => {
        reject("Failed to load image.");
        URL.revokeObjectURL(objectURL);
      };

      img.src = objectURL;
    });
  };

  const handleCoverImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the image file size exceeds 300KB before proceeding
      if (file.size > MAX_SIZE) {
        alert("Image exceeds the maximum size of 300KB.");
        return;
      }

      try {
        const resizedFile = await resizeImage(file);
        const previewUrl = URL.createObjectURL(resizedFile);
        setPreview(previewUrl);
        onCoverImageChange(resizedFile); // Pass the resized image to the parent component
      } catch (error) {
        console.error(error);
        alert(error); // Show error message (e.g., "Image exceeds the maximum size")
      }
    }
  };

  return (
    <div>
      <div
        className="w-full h-40 border border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 overflow-hidden relative"
        onClick={() => document.getElementById("cover-upload")?.click()}
      >
        {preview ? (
          <div className="absolute inset-0">
            <img
              src={preview}
              alt="Cover preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white bg-black bg-opacity-60 px-2 py-1 rounded text-sm">
                Change image
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-500">
              Click to upload cover image
            </p>
            <p className="text-xs text-gray-400">Max 300KB, 1200x630px</p>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id="cover-upload"
        type="file"
        accept="image/*"
        onChange={handleCoverImageChange}
        className="hidden"
      />
    </div>
  );
};

export default CoverImageUploader;
