import { useState , useEffect } from "react";
import { ThumbsUp, MessageCircle, X } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { UseComments } from "../hooks/UseComments";

interface FullSingleBlogProps {
  blog: {
    id: string;
    author?: {
      name: string;
      profileImg?: string;
    };
    title: string;
    content: string;
    createdAt: string;
    images?: string[];

    tag?: string;
  };
}
export const FullSingleBlog = ({ blog }: FullSingleBlogProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likeLoading, setLikeLoading] = useState(false);
  const [like, setLike] = useState(0);
  const [likedbyUser, setLikedByUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loading, comments,commentCount } = UseComments(blog.id);


  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/like/${blog.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLike(res.data.totalLikes);
        setLikedByUser(res.data.likedbyUser);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setError("Failed to load likes");
      }
    };
    fetchLikes();
  }, [blog]);

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
        `${BACKEND_URL}/api/v1/like/updateLike/${blog.id}/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLike(res.data.totalLikes);
      setLikedByUser(res.data.likedbyUser);
    } catch (error: unknown) {
      setError("Failed to update like");
    } finally {
      setLikeLoading(false);
    }
  };

  const { author, title, content, createdAt, images, tag = "General" } = blog;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 text-gray-100">
      <div className="bg-gray-900 rounded-2xl shadow-lg shadow-violet-500/10 p-6 lg:p-10 max-w-screen-xl mx-auto">
        <section className="text-gray-100">
          {error && (
            <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
          )}

          {/* Blog Header */}
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <div className=" mr-20 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-400 space-y-2 sm:space-y-0">
              <span>Published on {createdAt.slice(0, 10)}</span>
              <div className="flex items-center gap-2">
                <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white">
                  {tag}
                </span>
             
              </div>
            </div>
          </header>

          {/* Author */}
          <div className="flex items-center gap-4 mb-10 border-b border-gray-700 pb-6">
            <img
              src={author?.profileImg}
              alt="Author"
              className="w-12 h-12 rounded-full border border-indigo-500 object-cover"
            />
            <div>
              <p className="text-white font-semibold text-lg">{author?.name}</p>
              <p className="text-gray-400 text-sm">
                Digital storyteller, code whisperer & life-long learner.
              </p>
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed mb-12">
            <p className="whitespace-pre-line">{content}</p>
          </article>


          {/* Image Gallery */}
          {Array.isArray(images) && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700 cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
                >
                  <img
                    src={img}
                    alt={`Blog image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Modal */}
          {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="relative w-full max-w-5xl h-[80vh]">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  className="absolute top-4 right-2 text-white bg-blue-600 hover:bg-blue-500 p-2 rounded-full"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
          {/* Actions */}
          <div className="flex flex-wrap gap-6 mb-12">
            <button
              onClick={handleLikeClick}
              disabled={likeLoading}
              className={`flex items-center gap-2 text-base transition ${
                likeLoading
                  ? "text-gray-500"
                  : likedbyUser
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-300 hover:text-blue-200"
              }`}
            >
              <ThumbsUp
                className="w-5 h-5"
                strokeWidth={likedbyUser ? 1.5 : 2}
                fill={likedbyUser ? "#60a5fa" : "none"}
              />
              {like}
            </button>
            <button className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition" onClick={() => {
              
            }}>
              <MessageCircle className="w-5 h-5" />
              {commentCount}
            </button>
            
          </div>

          {/* Comments Section */}
          {loading ?(
            <div>
                <div>Please Wait comment is loading...</div>
                
            </div>
          ):(
            <div>
             
              <div className="mt-8">
              
                {comments.length > 0 ? (
                  <ul className="space-y-2">
                    {comments.reverse().map((comment) => (
                      <li key={comment.id} className="bg-gray-800 p-2 rounded-lg shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={comment.user.profileImg || "/default-profile.png"}
                            alt={comment.user.name}
                            className="w-4 h-4 rounded-full"
                          />
                          <span className="font-semibold text-gray-200">{comment.user.name}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                        
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                )}
              </div>
             
            </div>
          )}
           <CommentInput blogId={blog.id} />
        </section>
      </div>
    </div>
  );
};

function  CommentInput({ blogId }: { blogId: string }) {
  const[comment,setComment]=useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="mt-8">
   
      <textarea
        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write a comment..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button 
        disabled={loading}
        className={`mt-3 px-4 py-2 text-white rounded-lg transition ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-blue-500"
        }`} 
        onClick={(e)=>{
          e.preventDefault();
          if(loading) return;
          console.log("Comment to post:", comment);
          if(!comment.trim()) {
            alert("Comment cannot be empty");
            return;
          }
          setLoading(true);
          
          axios.post(`${BACKEND_URL}/api/v1/comment/${blogId}`, {
            content: comment,
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then(res => {
            console.log("Comment posted successfully:", res.data);
            setComment("");
            setLoading(false);
          })
          .catch(error=>{
            console.error("Failed to post comment:", error.response?.data || error.message);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);// reset loading whether success or failure
          });
          

        }}>
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </div>
  );
}