export default function BlogLoadingSkeleton() {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Banner & Title Section */}
            <div className="relative">
              <div className="relative h-96 overflow-hidden">
                {/* Cover Image Skeleton */}
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
              </div>
  
              <div className="absolute bottom-0 left-0 right-0 p-8">
                {/* Category Skeleton */}
                <div className="inline-block w-20 h-6 bg-gray-400 rounded-full mb-4 animate-pulse"></div>
  
                {/* Title Skeleton */}
                <div className="space-y-3 mb-4">
                  <div className="h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                  <div className="h-12 bg-gray-300 rounded-lg w-3/4 animate-pulse"></div>
                </div>
  
                {/* Author and Date Skeleton */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse border-2 border-white"></div>
                    <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
  
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-28 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Content Section */}
            <div className="px-8 md:px-16 py-10 bg-white">
              {/* Social sharing & actions bar skeleton */}
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200">
                <div className="flex space-x-4">
                  <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
  
                <div className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
  
              {/* Blog content skeleton */}
              <article className="prose prose-lg max-w-none">
                <div className="space-y-4">
                  {/* Simulate paragraphs */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
  
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
  
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                  </div>
  
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              </article>
  
              {/* Tags skeleton */}
              <div className="mt-12">
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-18 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-22 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
  
            {/* Author info card skeleton */}
            <div className="px-8 md:px-16 py-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-b border-gray-200">
              <div className="w-32 h-4 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse border-2 border-white shadow-md"></div>
                <div className="flex-1">
                  <div className="w-40 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
                  <div className="space-y-2 mb-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
  
            {/* Action bar skeleton (conditionally shown) */}
            <div className="px-8 md:px-16 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }