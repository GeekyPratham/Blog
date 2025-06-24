export const BlogSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-1 border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 shadow-md animate-pulse">
      {/* Left Section */}
      <div className="flex-1 flex flex-col gap-2 w-full">
        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-gray-700" />
          <div className="w-24 h-4 bg-gray-700 rounded" />
          <div className="w-10 h-4 bg-gray-700 rounded" />
        </div>

        {/* Title */}
        <div className="w-3/4 h-6 bg-gray-700 rounded" />

        {/* Content preview */}
        <div className="w-full h-4 bg-gray-700 rounded" />
        <div className="w-5/6 h-4 bg-gray-700 rounded" />

        {/* Tag and Read Time */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-16 h-5 bg-gray-700 rounded-full" />
          <div className="w-12 h-4 bg-gray-700 rounded" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-3">
          <div className="w-16 h-4 bg-gray-700 rounded" />
          <div className="w-20 h-4 bg-gray-700 rounded" />
          <div className="w-16 h-4 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Image */}
      <div className="mt-4 sm:mt-0 sm:ml-4 sm:w-32 h-24 bg-gray-700 rounded-lg" />
    </div>
  );
};
