import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"
import axios from "axios"

interface UserDetailsProps {
    name? : string,
    password? : string,
    profileImg? : string,
}
export const UseDetails = () =>{

    const [loading,setLoading] = useState<boolean>(true);
    const [details,setDetails] = useState<UserDetailsProps>();

    useEffect(()=>{
        const id = localStorage.getItem('userId');
        axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log("User detail fetched successfully:", res.data.user);
            setDetails(res.data.user);
            setLoading(false);
        })
        .catch(error => {
            console.error(" Failed to fetch user detail:", error.response?.data || error.message);
            setLoading(false);
        });
    },[])
    return{
        loading,
        details
    }
        
}