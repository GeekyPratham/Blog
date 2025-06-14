import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";


interface BlogCardProps {
  id:string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  imageUrl?: string;
  avatarUrl?: string;
  tag?: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  imageUrl,
  avatarUrl,
  tag = "General",
}: BlogCardProps) => {
  return (
    <Link  to={`/blog/${id}`}
            state={{ id }}
      >
        <div className="flex cursor-pointer justify-between items-start border-b border-gray-700 pb-6 mb-6 max-w-4xl bg-gray-900 text-gray-100 rounded-xl p-4 shadow-md shadow-violet-500/10 hover:shadow-violet-400/20 cursor-pointer transition duration-300 ">
        {/* Left Section */}
        <div className="flex flex-col flex-1 pr-4">
          {/* Author Info */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Author Avatar"
                className="w-6 h-6 rounded-full border border-violet-500"
              />
            )}
            <span className="font-medium text-green-400">{authorName}</span>
            <span className="text-purple-400">•</span>
            <span>{publishedDate}</span>
          </div>

          {/* Title and Description */}
          <h2 className="text-lg font-bold text-blue-300 leading-tight hover:text-blue-400 transition">
            {title}
          </h2>
          <p className="text-gray-300 text-sm mt-2 line-clamp-2">
            {content.substring(0, 200) + "..."}
          </p>

          {/* Tag and Read Time */}
          <div className="flex items-center gap-3 text-xs mt-3">
            <span className="bg-green-700 text-green-200 px-2 py-1 rounded-full font-medium">
              {tag}
            </span>
            <span className="text-gray-400">{Math.ceil(content.length / 100)} min read</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-3 flex gap-6 text-sm">
            <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition">
              <ThumbsUp className="w-4 h-4" onClick={()=>{
                  
              }}/>
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
        {imageUrl && (
          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-700">
            <img
              src={imageUrl}
              alt="Blog"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
};
