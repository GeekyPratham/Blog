import { useLocation } from "react-router-dom";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useEffect } from "react";

interface FullSingleBlogProps {
  blog: {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    imageUrl?: string;
    avatarUrl?: string;
    tag?: string;
  };
}

export const FullSingleBlog = ({ blog }: FullSingleBlogProps) => {
  
  if (!blog) return <div className="text-white">No blog data available.</div>;

  const {
    authorName,
    title,
    content,
    publishedDate,
    avatarUrl,
    imageUrl,
    tag = "General",
  } = blog;

  return (
    <div className="max-w-5xl mx-auto p-6 text-gray-100">
      <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-gray-700 pb-6 mb-6 bg-gray-900 rounded-xl shadow-md shadow-violet-500/10 p-4">
        {/* Blog Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-300 mb-2">{title}</h1>
          <p className="text-sm text-gray-400 mb-4">Posted on {publishedDate}</p>
          <p className="text-base text-gray-200 leading-relaxed whitespace-pre-line">
            {content}
          </p>

          {/* Tags and Read Time */}
          <div className="flex items-center gap-3 text-xs mt-6">
            <span className="bg-green-700 text-green-200 px-2 py-1 rounded-full font-medium">
              {tag}
            </span>
            <span className="text-gray-400">
              {Math.ceil(content.length / 100)} min read
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-6 text-sm">
            <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition">
              <ThumbsUp className="w-4 h-4" />
              Like
            </button>
            <button className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition">
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
            <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Author Section */}
        <div className="min-w-[200px] border-l border-gray-700 pl-6">
          <p className="text-sm text-gray-400 mb-1">Author</p>
          <div className="flex items-center gap-3">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Author"
                className="w-10 h-10 rounded-full border border-violet-500"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-white">{authorName}</h3>
              <p className="text-gray-400 text-sm">
                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image at Bottom (optional) */}
      {imageUrl && (
        <div className="rounded-lg overflow-hidden mt-6 border border-gray-700">
          <img src={imageUrl} alt="Blog Visual" className="w-full object-cover" />
        </div>
      )}
    </div>
  );
};
