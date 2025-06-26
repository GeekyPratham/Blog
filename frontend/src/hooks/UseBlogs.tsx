import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface BlogCardProps {
  id : string,
  author: {
    name: string;
  };
  title: string;
  content: string;
  createdAt: string;
  images?: string[];
  avatarUrl?: string;
  tag?: string;
}


// console.log(`${BACKEND_URL}/api/v1/blog/bulk`);

export const useBlog = ( id:string ) =>{

    const [loading, setLoading] = useState<boolean>(true);
    const [blog,setBlog] = useState<BlogCardProps>();
      
    console.log("hello from useBlog hook");
    console.log("id")
    console.log(`${id}`)
    console.log(`${BACKEND_URL}/api/v1/blog/${id}`)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log("Blog fetched successfully:", res.data.blog);
            setBlog(res.data.blog);
            setLoading(false);
        })
        .catch(error => {
            console.error(" Failed to fetch blog:", error.response?.data || error.message);
            setLoading(false);
        });
    }, [id]);

      useEffect(() => {
        if (blog) {
            console.log(" Blog state updated:", blog);
        }
    }, [blog]);


    return {
        loading,
        blog,

    }
}
export const useBlogs = () =>{

    const [loading, setLoading] = useState<boolean>(true);
    const [blogs,setBlogs] = useState<BlogCardProps[]>([]);
    console.log(blogs)
    console.log("hello from useBlogs hook");

    useEffect(  ()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}` // Uncomment if you need to send a token
            }
        })
            .then(res => {

                console.log("Blogs fetched successfully:", res.data.posts);
                setBlogs(res.data.posts);
                setLoading(false);
            }) 
            
    },[])
    

    return {
        loading,
        blogs,

    }
}