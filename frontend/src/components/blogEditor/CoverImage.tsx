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
            },
            "image/jpeg",
            0.8 // Adjust the quality as needed
          );
        }
      };

      img.onerror = () => {
        reject("Failed to load image.");
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
        setPreview(URL.createObjectURL(resizedFile));
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
        className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500"
        onClick={() => document.getElementById("cover-upload")?.click()}
        style={{
          backgroundImage: preview ? `url(${preview})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!preview && (
          <span className="text-gray-500">Click to add a cover image</span>
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
