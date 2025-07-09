import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/UseBlogs";
import { useEffect } from "react";


export const Blogs = () => {
  const { loading, blogs } = useBlogs();

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
        No Blogs Available
      </h1>

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
        {[...blogs].reverse().map((blog) => (
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
              avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
              tag={blog.tag}
              type="Blogs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
