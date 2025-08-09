import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogswithPage } from "../hooks/UseBlogs";
import { useEffect,useState } from "react";


export const Blogs = () => {

  const [pageNo, setPageNo] = useState<number>(1); // default page number
  console.log("inside blogs page:");
  console.log(pageNo)
  const { loading, blogs } = useBlogswithPage(pageNo);
  const [buttonLoadingNext, setButtonLoadingNext] = useState<boolean>(false);
  const [buttonLoadingPrev, setButtonLoadingPrev] = useState<boolean>(false);
  
  useEffect(()=>{
    setButtonLoadingNext(false);
    setButtonLoadingPrev(false)
  },[blogs])
  
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  },[loading,navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  
  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 md:p-10 overflow-x-hidden">
      <AppBar/>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-6 text-center">
        No More Blogs Available
      </h1>


      <div className="flex justify-center mt-5 cursor-pointer gap-3">
        
        <button
          onClick={(()=>{
            setButtonLoadingPrev(true);
            setPageNo(pageNo-1); // decrement page number for prev fetch
           
          })}
          disabled={buttonLoadingPrev || pageNo<1}
          className={`px-4 py-2 rounded text-white cursor-pointer ${
            buttonLoadingPrev ?'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {buttonLoadingPrev ? "Loading Prev..." : "Prev"}
        </button>
        
      </div>
    </div>
    );
  }
  console.log("inside Blogs Routes");
  console.log("blogs", blogs);
  return (
    <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 md:p-10 overflow-x-hidden">
      <AppBar/>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-6 text-center">
        Latest Blogs
      </h1>

      <div className="flex flex-col gap-8 items-center w-full">
        {blogs.length >0 && [...blogs].reverse().map((blog) => (
          <div key={blog.id} className="w-full max-w-4xl px-2 sm:px-4">
            <BlogCard
              id={blog.id}
              author={blog.author }
              title={blog.title}
              content={blog.content}
              createdAt={blog.createdAt}
              images={
                Array.isArray(blog.images)
                  ? blog.images.filter((img): img is string => typeof img === "string")
                  : typeof blog.images === "string"
                  ? [blog.images]
                  : []
              }
              tag={blog.tag}
              type="Blogs"
              
            />
          </div>
        ))}

      </div>

      <div className="flex justify-center mt-5 cursor-pointer gap-3">
        
        <button
          onClick={(()=>{
            if(buttonLoadingPrev==true) return;
            setButtonLoadingPrev(true);
            setPageNo((pageNo)=>pageNo-1); // decrement page number for prev fetch
          
          })}
          disabled={buttonLoadingPrev || pageNo<=1}
        
          className={`px-4 py-2 rounded text-white cursor-pointer ${
            buttonLoadingPrev || pageNo<=1 ?'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {buttonLoadingPrev ? "Loading Prev..." : "Prev"}
        </button>
        <button
          onClick={()=>{
            if(buttonLoadingNext==true) return;
            setButtonLoadingNext(true)
            setPageNo(pageNo+1)
         
          }}
          disabled={buttonLoadingNext}
          className={`px-4 py-2 rounded text-white cursor-pointer ${
            buttonLoadingNext ?'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {buttonLoadingNext ? "Loading Next..." : "Next"}
        </button>
      </div>
    </div>
  );
};
