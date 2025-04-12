export default function BlogSkeleton() {
  const skeletonBlogs = Array.from({ length: 7 }); 

  return (
    <div className="border-2 p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul className="grid grid-cols-3 gap-[40px]">
        {skeletonBlogs.map((_, index) => (
          <li
            key={index}
            className="border w-[400px] rounded shadow-sm bg-white animate-pulse"
          >
            <div className="space-y-4">
              {/* Category placeholder */}
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>

              {/* Image placeholder */}
              <div className="w-full h-[150px] bg-gray-300 rounded"></div>

              {/* Date placeholder */}
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>

              {/* Title placeholder */}
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>

              {/* Category placeholder */}
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>

              {/* Content placeholder */}
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>

              {/* Author placeholder */}
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
