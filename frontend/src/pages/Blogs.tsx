import App from "../App";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"


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

            <BlogCard
                avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
                authorName="PrathamRaj"
                title="My first blog"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, magni neque! Labore sint rem, perspiciatis deleniti eius quibusdam aliquam! Asperiores, laudantium perspiciatis."
                publishedDate="12/06/2025"
                imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
            />

            <BlogCard
                avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
                authorName="PrathamRaj"
                title="Exploring React Components"
                content="React components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontendsReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontendsReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontends."
                publishedDate="12/06/2025"
                imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
            />

            <BlogCard
                avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
                authorName="PrathamRaj"
                title="Why TypeScript is Awesome"
                content="TypeScript helps catch bugs early through its static typing system and provides better IDE support. Here's why you should consider using it in your next projectReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontendsReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontendsReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontendsReact components are the building blocks of any React application. Understanding their structure and behavior is crucial for building scalable frontends."
                publishedDate="12/06/2025"
                imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"
            />
        </div>
    </div>
  );
};
