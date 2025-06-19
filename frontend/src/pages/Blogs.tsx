import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/UseBlogs";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-white text-2xl">No Blogs Found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 md:p-10 overflow-x-hidden">
      <AppBar
        userName="Pratham Raj"
        imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
      />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-6 text-center">
        Latest Blogs
      </h1>

      <div className="flex flex-col gap-8 items-center w-full">
        {blogs.map((blog) => (
          <div key={blog.id} className="w-full max-w-4xl px-2 sm:px-4">
            <BlogCard
              id={blog.id}
              authorName={blog.authorName}
              title={blog.title}
              content={blog.content}
              publishedDate={new Date(blog.publishedDate).toLocaleDateString()}
              imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
              avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
              tag={blog.tag}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
