import { useEffect, useState } from 'react';
import axios from 'axios';
// Make sure the config file exists at the correct path and exports BACKEND_URL
import { BACKEND_URL } from '../../config';

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  imageUrl?: string;
  avatarUrl?: string;
  tag?: string;
}

export const useBlogs = () =>{

    const [loading, setLoading] = useState<boolean>(true);
    const [blogs,setBlogs] = useState<BlogCardProps[]>([]);


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/bulk`)
            .then(res => {

                console.log("Blogs fetched successfully:", res.data.posts);
                setBlogs(res.data);
                setLoading(false);
            }) 
    },[])
    

    return {
        loading,
        blogs,

    }
}