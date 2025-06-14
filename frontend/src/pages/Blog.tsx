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
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-800">
                    <div className="text-white text-2xl">No Blogs Found</div>
                </div>
            );
        }
        console.log(blog);
        return (
            <div>
                <div>
                    <AppBar userName="Pratham Raj" imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"/>
                </div>
        
                <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-4 flex flex-col items-center">
                
                 
                    
                    return(
                        <FullSingleBlog 
                            blog = {blog}
                        />
                    )
                    
                </div>
            </div>
        );
}