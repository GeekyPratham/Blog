import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2, X } from "lucide-react";

interface FullSingleBlogProps {
  blog: {
    id: string;
    author?: {
      name: string;
    };
    title: string;
    content: string;
    createdAt: string;
    images?: string[];
    avatarUrl?: string;
    tag?: string;
  };
}

export const FullSingleBlog = ({ blog }: FullSingleBlogProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!blog) return <div className="text-white">No blog data available.</div>;

  const {
    author,
    title,
    content,
    createdAt,
    avatarUrl = "https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg",
    images,
    tag = "General",
  } = blog;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 text-gray-100">
      <div className="flex flex-col lg:flex-row justify-between gap-8 border-b border-gray-700 pb-8 mb-8 bg-gray-900 rounded-2xl shadow-lg shadow-violet-500/10 p-6 lg:p-8">
        {/* Blog Content */}
        <div className="flex-1">
          <h1 className="min-h[60] text-4xl lg:text-5xl font-bold text-blue-300 mb-4 break-words">
            {title}
          </h1>
          <p className="text-sm text-gray-400 mb-6">Posted on {createdAt.slice(0,10)}</p>

          <p className="text-lg lg:text-xl text-gray-200 leading-relaxed whitespace-pre-line">
            {content}
          </p>

          {/* Tags and Read Time */}
          <div className="flex items-center gap-3 text-sm mt-8 flex-wrap">
            <span className="bg-green-700 text-green-200 px-3 py-1 rounded-full font-medium">
              {tag}
            </span>
            <span className="text-gray-400">
              {Math.ceil(content.length / 100)} min read
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 text-base">
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
              <ThumbsUp className="w-5 h-5" />
              Like
            </button>
            <button className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition">
              <MessageCircle className="w-5 h-5" />
              Comment
            </button>
            <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </div>

        {/* Author Section */}
        <div className="min-w-full lg:min-w-[260px] border-t lg:border-t-0 lg:border-l border-gray-700 pt-6 lg:pt-0 lg:pl-8">
          <p className="text-sm text-gray-400 mb-2">Author</p>
          <div className="flex items-center gap-4">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Author"
                className="w-12 h-12 rounded-full border border-violet-500"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold text-white">{author?.name}</h3>
              <p className="text-gray-400 text-sm">
                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {Array.isArray(images) && images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-700 cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Blog Image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-[80vw] max-w-5xl h-[80vh]">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg shadow-xl"
            />
            <button
              className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-500 p-1 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
