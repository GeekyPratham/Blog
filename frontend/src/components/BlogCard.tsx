import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  author: {
    name: string;
  };
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  avatarUrl?: string;
  tag?: string;
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  createdAt,
  images,
  avatarUrl,
  tag = "General",
}: BlogCardProps) => {
  // Prevent click propagation for action buttons
  const handleButtonClick = (e) => {
    
  };

  return (
    <Link to={`/blog/${id}`} state={{ id }} className="block">
      <div className="border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/30 transition-all duration-300">
        {/* Upper Section: Content and Image */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Left Section: Content */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Author Info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              {avatarUrl && (
                <img
                  src={avatarUrl}
                  alt={`${author.name}'s avatar`}
                  className="w-6 h-6 rounded-full border border-violet-500 object-cover"
                />
              )}
              <span className="font-medium text-green-400">{author?.name || "Unknown Author"}</span>
              <span className="text-purple-400">•</span>
              <span>{createdAt.slice(0, 10)}</span>
            </div>

            {/* Title and Description */}
            <h2 className="text-lg sm:text-xl font-semibold text-blue-300 hover:text-blue-400 transition-colors line-clamp-2">
              {title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-1 line-clamp-3 sm:line-clamp-2">
              {content.substring(0, 200) + "..."}
            </p>

            {/* Tag and Read Time */}
            <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm mt-2">
              <span className="bg-green-700 text-green-200 px-2 py-1 rounded-full font-medium">
                {tag}
              </span>
              <span className="text-gray-400">{Math.ceil(content.length / 100)} min read</span>
            </div>
          </div>

          {/* Right Section: Image */}
          {images && images.length > 0 && (
            <div className="w-full sm:w-32 md:w-40 h-24 sm:h-28 md:h-32 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={images[0]}
                alt={`Blog post image for ${title}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Lower Section: Action Buttons and More Options */}
        <div className="flex items-center justify-between w-full mt-4 pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-4 text-sm">
            <button
              
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              aria-label="Like this post"
            >
              <ThumbsUp className="w-4 h-4" />
              Like
            </button>
            <button
    
              className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
              aria-label="Comment on this post"
            >
              <MessageCircle className="w-4 h-4" />
              Comment
            </button>
            <button
            
              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="Share this post"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
          <button
            onClick={handleButtonClick}
            className="text-gray-500 hover:text-gray-400 transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};