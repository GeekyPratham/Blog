import { useBlog }  from "../hooks/UseBlogs";
import { AppBar } from "../components/AppBar";
import { useLocation } from "react-router-dom";
import { FullSingleBlog } from "../components/FullSingleBlog";



export const Blog = () =>{
    const location = useLocation();
    const id = location?.state?.id;
    console.log("hello from Blog ")
    console.log(id)
   
    const { loading,blog } = useBlog(id);
    
    if(loading){
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-800">
                    <div className="text-white text-2xl">Loading...</div>
                </div>
            );
    }
    if(!blog){
            console.log("BLOG NOT FOUND");
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-800">
                    <div className="text-white text-2xl">No Blogs Found</div>
                </div>
            );
    }
    console.log("Blog route page");
    console.log(blog);
    return (
            <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-4 sm:p-6 md:p-10 overflow-x-hidden">
                
                <div className="overflow-hidden">
                    <AppBar/>
                </div>
            
        
                <div  className="h-full  flex flex-col gap-5 items-center">
                
                    <FullSingleBlog 
                            blog = {blog}
                    />
                    
                </div>
            </div>
    );
}