
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/UseBlogs"


export const Blogs = () => {

    const {loading,blogs} = useBlogs();

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }
    if(!blogs || blogs.length === 0){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="text-white text-2xl">No Blogs Found</div>
            </div>
        );
    }

  return (
    <div>
        <div>
            <AppBar userName="Pratham Raj" imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"/>
        </div>

        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-4 flex flex-col items-center">
        
            <h1 className="text-3xl md:text-4xl font-bold text-blue-300 mb-10">Latest Blogs</h1>

            {blogs.map(blog  =>{
                return(
                    <BlogCard 
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.authorName}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={new Date(blog.publishedDate).toLocaleDateString()}
                        imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
                        avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
                        tag={blog.tag}
                    />
                )
            })}
        </div>
    </div>
  );
};
