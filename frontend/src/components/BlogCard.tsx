import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface BlogCardProps {
  id: string;
  author: {
    name: string;
    id: string;
    profileImg?: string;
  };
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  tag?: string;
  type: "Blogs" | "Myposts";
  onDelete?: (id: string) => void;
}

export const BlogCard = ({
  id,
  author,
  title,
  content,
  createdAt,
  images,
  tag,
  type,
  onDelete,
}: BlogCardProps) => {
  const [options, setOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const [likedbyUser, setLikedByUser] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch initial likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/like/${id}`,{
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setLike(res.data.totalLikes);
        setLikedByUser(res.data.likedbyUser);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setError("Failed to load likes");
      }
    };
    fetchLikes();
  }, [id]);

 
  // Handle like/unlike
  const handleLikeClick = async () => {
    if (likeLoading) return;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setError("Please log in to like posts");
      return;
    }

    setLikeLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/like/updateLike/${id}/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLike(res.data.totalLikes);
      setLikedByUser(res.data.likedbyUser);
      setError(null);
    } catch (error: unknown) {
      console.error("Error updating like:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to update like");
      } else {
        setError("Failed to update like");
      }
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/30 transition-all duration-300 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/30 transition-all duration-300">
      {error && (
        <div className="text-red-400 text-sm mb-2">{error}</div>
      )}
      <Link to={`/blog/${id}`} state={{ id }} className="block">
        <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-full sm:w-1/2 p-2 flex-1 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <img
                src={author.profileImg || "/default-avatar.png"}
                alt={`${author.name}'s avatar`}
                className="w-6 h-6 rounded-full border border-violet-500 object-cover"
              />
              <span className="font-medium text-green-400">{author?.name || "Unknown Author"}</span>
              <span className="text-purple-400">•</span>
              <span>{createdAt.slice(0, 10)}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-blue-300 hover:text-blue-400 transition-colors break-words">
              {title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-1 line-clamp-3 sm:line-clamp-2 break-words">
              {content.substring(0, 200) + "..."}
            </p>
            <div className="flex items-center flex-wrap gap-3 text-xs sm:text-sm mt-2">
              <span className="bg-green-700 text-green-200 px-2 py-1 rounded-full font-medium">
                {tag || "No Tag"}
              </span>
              <span className="text-gray-400">{Math.ceil(content.length / 300)} min read</span>
            </div>
          </div>
          {images && images.length > 0 && (
            <div className="w-full sm:w-1/2 mt-0 sm:mt-9 p-2 md:w-40 h-24 sm:h-28 md:h-32 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={images[0] || "/default-image.png"}
                alt={`Blog post image for ${title}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-4 pt-4 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm">
          <button
            onClick={handleLikeClick}
            disabled={likeLoading}
            className={`flex items-center gap-1 ${
              likeLoading
                ? "text-gray-500"
                : likedbyUser
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-300 hover:text-blue-300"
            } transition-colors`}
            aria-label="Like this post"
          >
            <ThumbsUp
              className="w-4 h-4"
              strokeWidth={likedbyUser ? 1.5 : 2}
              fill={likedbyUser ? "#60a5fa" : "none"} // blue-400 fill if liked
            />
            {like}
          </button>

          <button
            className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
            aria-label="Comment on this post"
            disabled // Placeholder until implemented
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
        {type === "Myposts" && !options && (
          <button
            onClick={() => setOptions(true)}
            className="text-gray-500 hover:text-gray-400 transition-colors cursor-pointer p-2 rounded-full hover:bg-gray-800"
            aria-label="More options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
        {options && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="bg-green-700 rounded-lg shadow-lg p-5 w-48 sm:w-52 text-white transform scale-95 sm:scale-100 transition-all duration-300"
            >
              <X
                size={20}
                className="absolute top-2 right-2 bg-green-600 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-500"
                onClick={() => setOptions(false)}
              />
              <div className="flex flex-col items-center gap-2">
                <button
                  className="cursor-pointer hover:underline w-full text-center"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                      });
                      navigate('/publish', { state: { blog: res.data.blog } });
                    } catch (error) {
                      console.error("Error fetching blog:", error);
                      setError("Failed to load blog for editing");
                    } finally {
                      setLoading(false);
                      setOptions(false);
                    }
                  }}
                >
                  Edit Blog
                </button>
                <button
                  className="cursor-pointer hover:underline w-full text-center"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                      });
                      onDelete?.(id);
                    } catch (error) {
                      console.error("Error deleting blog:", error);
                      setError("Failed to delete blog");
                    } finally {
                      setLoading(false);
                      setOptions(false);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};