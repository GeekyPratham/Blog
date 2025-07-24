import { useEffect, useState ,useRef } from "react";
import { AppBar } from "../components/AppBar"
import { UseDetails } from "../hooks/UseDetails";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { updateUserDetails } from "@geekypratham/blog-common";

export const Editprofile = () => {

    const {loading , details}  = UseDetails();
    const [name,setName] = useState<string>("");
    const[password,setPassword] = useState<string>("");
    const [profileImg,setProfileImg] = useState<string>("");

    useEffect(()=>{
        if (details) {
            setName(details.name || "");
            setPassword(details.password || "");
            setProfileImg(details.profileImg || "");
        } else {
            setName("");
            setPassword("");
            setProfileImg("");
        }
    },[details])

    if(loading){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <div className="text-white text-2xl">Loading...</div>
                 <ClipLoader color="#36d7b7" loading={loading} size={50} />
            </div>
        );
    }
    console.log("details");
    console.log(name);
    console.log(password);
    console.log(profileImg);
    console.log(details);
    return (
        <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-6">
            <AppBar/>
            
            <h1 className="text-4xl font-bold text-blue-300 text-center">My Profile</h1>

            <TextArea

            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            profileImg={profileImg}
            setProfileImg={setProfileImg} />

        </div>
    )
}
function TextArea ({name,setName,password,setPassword,profileImg,setProfileImg}:{
    name:string;
    setName:(value:string) => void;
    password:string;
    setPassword:(value:string)=>void;
    profileImg:string;
    setProfileImg:(value:string)=>void;
}){
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [detailLoading,setDetailLoading] = useState<boolean>(false);  
    if(detailLoading){
        return(
            <div className="w-full min-h[50] p-2  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-col gap-3 sm:p-10">

            <div className="flex items-center justify-center w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700">
                <span className="mr-2">Please wait your details geting updated ...</span>
                <ClipLoader color="#36d7b7" loading={detailLoading} size={20} />
            </div>
        </div>
        )
    }
    else {
        return (
        <div className="w-full min-h[50] p-2  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-col gap-3 sm:p-10">

            <div className="w-full max-w-8xl   rounded-lg shadow-lg">
                <input className="w-full  p-3  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Name" value={name} onChange={(e)=>{
                    setName(e.target.value)
                }} />
            </div> 
            <div className="w-full max-w-8xl  rounded-lg shadow-lg ">
                <input className="w-full  p-3  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} />
            </div>
            
            <div className="w-full max-w-8xl  rounded-lg shadow-lg flex gap-3">
                {
                    loading ? (
                        <div className="flex items-center justify-center w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700">
                            <span className="mr-2">Please Wait image is processing</span>
                            <ClipLoader color="#36d7b7" loading={loading} size={20} />
                        </div>
                    ) :
                    profileImg ? (
                        <input className="w-full  p-3  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"  placeholder="Image" value={profileImg} onChange={(e)=>{
                            setProfileImg(e.target.value)
                        }} />

                    ):(
                        <input className="w-full  p-3  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"  placeholder=" No Image" value={profileImg} onChange={(e)=>{
                            setProfileImg(e.target.value)
                        }} />
                    )
                }
                <button  className="w-30 sm:w-50 bg-green-600 hover:bg-green-500 text-white text-sm p-2 rounded-full transition font-medium shadow-md  " onClick={()=>{
                    if(fileInputRef.current){
                        fileInputRef.current.click();
                    }
                }} >Upload Image</button>
                <input
                    ref = {fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e)=>{
                        const img = e.target.files?.[0];
                        if(img){
                            try{
                                const formData = new FormData();
                                formData.append('file',img);
                                formData.append("upload_preset","BlogImages");
                                formData.append("cloud_name","db0hcdu39");
                                setLoading(true);
                                const res = await axios.post<{url:string}>("https://api.cloudinary.com/v1_1/db0hcdu39/image/upload", formData);
                               
                                console.log("Image uploaded successfully:", res.data.url);
                                setProfileImg(res.data.url);
                                console.log("checking profileImg type");
                                console.log(typeof profileImg);
                                setLoading(false);
                            }
                            catch(err){
                                console.log("Error uploading image:", err);
                                alert("Error uploading image. Please try again.");
                            }
                            
                        }
                    }}

                    
                />
            </div> 
           <div>
                <button  className="w-30 sm:w-50 bg-green-600 hover:bg-green-500 text-white text-sm p-2 rounded-full transition font-medium shadow-md  " onClick={async()=>{
                    if(!name || !password || !profileImg){
                        alert("Please fill all the fields");
                        return;
                    }
                    const schema = updateUserDetails;
                    const result = schema.safeParse({
                        name,
                        password,
                        profileImg
                    })
                    if (!result.success) {
                        console.error("Validation failed:", result.error);
                        alert("Please enter valid details");
                        
                        return;
                    }
                    try{
                        setDetailLoading(true);
                        console.log("Updating profile with details:", {
                            name,
                            password,
                            profileImg
                        });
                        
                        const res = await axios.patch(`${BACKEND_URL}/api/v1/user/updateProfile/${localStorage.getItem("userId")}`,{
                            name,
                            password,
                            profileImg
                        },{
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        console.log("Profile updated successfully:", res.data);
                        localStorage.setItem("name", name);
                        localStorage.setItem("profileImg", profileImg);
                        
                        alert("Profile updated successfully");
                       

                    }
                    catch(err){
                        console.log("Error updating profile:", err);
                        alert("Error updating profile. Please try again.");
                    }
                    setDetailLoading(false);
                }} >Update Profile</button>
            </div>
        </div>
    )
    }

}
