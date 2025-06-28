import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {   useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

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
  avatarUrl,
  tag,
  type,
  onDelete,
}: BlogCardProps) => {
  
  const [options,setOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();


  if(loading){
   
    return (
      <div  className="border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/30 transition-all duration-300 flex items-center justify-center">
        Loading......
      </div>
    )
  }
  // Prevent click propagation for action buttons
  const handleButtonClick = () => {
    setOptions(true)
    
  };

  return (
      <div className="border border-gray-800 p-4 sm:p-6 rounded-xl bg-gray-900 text-gray-100 shadow-lg hover:shadow-purple-400/30 transition-all duration-300">
        
        {/* Upper Section: Content and Image */}
        <Link to={`/blog/${id}`} state={{ id }} className="block">
          <div className="w-full  flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Left Section: Content */}
            <div className="w-full sm:w-1/2 p-2 flex-1 flex flex-col gap-3">
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
              <h2 className="text-lg sm:text-xl font-semibold text-blue-300 hover:text-blue-400 transition-colors break-words">
                {title}
              </h2>

              <p className="text-gray-300 text-sm sm:text-base mt-1 line-clamp-3 sm:line-clamp-2 break-words">
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
              <div className="w-full sm:w-1/2 mt-0 sm:mt-9 p-2 md:w-40 h-24 sm:h-28 md:h-32 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={images[0]}
                  alt={`Blog post image for ${title}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </Link>

        {/* Lower Section: Action Buttons and More Options */}
        <div className="flex -col sm:flex items-center justify-between w-full mt-4 pt-4 border-t border-gray-700">
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
          {
            (type === "Myposts"  &&  !options ) && (
              <button 
                onClick={handleButtonClick}
                className="text-gray-500 hover:text-gray-400 transition-colors cursor-pointer p-2 rounded-full hover:bg-gray-800"
                aria-label="More options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            )
          }
          {options && (
            <>
              {/*  Background Blur Overlay */}
             

              {/* Hamburger Menu Box with Animation */}
              <div className=" top-24 right-6 sm:right-20 w-48 sm:w-52  bg-green-700 rounded-lg shadow-lg z-50 transform scale-95 sm:scale-100 transition-all duration-300 ease-out">
                <X
                  size={20}
                  className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-500"
                  onClick={() => setOptions(false)}
                />
                <div className="flex flex-col items-center justify-center h-13 p-5 gap-2 text-white">
                  <div className="cursor-pointer hover:underline" onClick={async()=>{
                      setLoading(true);
                      try {
                        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                          headers: { 
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        });
                        console.log("response from backend", res.data);
                        navigate('/publish',{
                          state:{
                            blog:res.data.blog,
                          }
                        });
                        
                        setOptions(false);

                      } catch (error) {
                        console.error("Error deleting blog:", error);
                        setLoading(false);
                      }
                  }}>Edit Blog</div>
                  <div className="cursor-pointer hover:underline" onClick={async () => {
                    setLoading(true);  
                    try {
                      await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${id}`, {
                        headers: { 
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                      });
                      setLoading(false);
                      setOptions(false);
                      onDelete?.(id);  // notify parent to delete this post which has this id
                    } catch (error) {
                      console.error("Error deleting blog:", error);
                      setLoading(false);
                    }
                  }}
                  >Delete</div>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
  
  );
};