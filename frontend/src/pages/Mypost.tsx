import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect, useState } from "react";
import { useBlogs } from "../hooks/UseBlogs";

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

export const Mypost = () => {
  const { loading, blogs } = useBlogs();
  const navigate = useNavigate();
  const [myBlogs, setMyBlogs] = useState<BlogCardProps[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  }, [loading, navigate]);

  useEffect(() => {
    // Filter only user’s own posts
    const userId = localStorage.getItem("userId");
    const filtered = blogs
      ?.filter((b) => b.author.id === userId)
      .map((b) => ({
        ...b,
        type: "Myposts" as const,
      }));
    setMyBlogs(filtered || []);
  }, [blogs]);

  const handleDelete = (id: string) => {
    // Remove blog from local state without refresh
    setMyBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  if (myBlogs.length === 0) {
    return (
      <div className="min-h-screen text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-6">
        <AppBar
          userName="Pratham Raj"
          avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
        />
        <h1 className="text-3xl font-bold text-center text-blue-300 mt-10">
          No Blogs Posted Yet!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-6">
      <AppBar
        userName="Pratham Raj"
        avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
      />
      <h1 className="text-4xl font-bold text-blue-300 text-center">My Blogs</h1>
      <div className="flex flex-col gap-8 items-center w-full">
        {myBlogs.map((blog) => (
          <div key={blog.id} className="w-full max-w-4xl">
            <BlogCard
              id={blog.id}
              author={blog.author}
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
              type="Myposts"
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
