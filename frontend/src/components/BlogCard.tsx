import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";


interface BlogCardProps {
  id: string;
  author?: {
    name: string;
  };
  title: string;
  content: string;
  publishedDate: string;
  images: string[];
  avatarUrl?: string;
  tag?: string;
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  publishedDate,
  images,
  avatarUrl,
  tag = "General",
}: BlogCardProps) => {


  console.log("images", images);
  console.log("author", author);  
  return (
    <Link to={`/blog/${id}`} state={{ id }}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-1 border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/20 transition-all duration-300 ">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Author Avatar"
                className="w-6 h-6 rounded-full border border-violet-500"
              />
            )}
            <span className="font-medium text-green-400">{author?.name}</span>
            <span className="text-purple-400">•</span>
            <span>{publishedDate}</span>
          </div>

          {/* Title and Description */}
          <h2 className="text-lg sm:text-xl font-semibold text-blue-300 hover:text-blue-400 transition">
            {title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-1 line-clamp-2">
            {content.substring(0, 200) + "..."}
          </p>

          {/* Tag and Read Time */}
          <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm mt-2">
            <span className="bg-green-700 text-green-200 px-2 py-1 rounded-full font-medium">
              {tag}
            </span>
            <span className="text-gray-400">{Math.ceil(content.length / 100)} min read</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
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

        {/* Right Side Image */}
        {images && (
          
          <div className=" flex items-center p-1 sm:w-30 h-full rounded-lg border border-gray-700">
            <img
              src={images[0]}
              alt="Blog"
              className="w-full h-full  object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>

        )}
      </div>
    </Link>
  );
};
