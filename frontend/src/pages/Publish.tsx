import { AppBar } from "../components/AppBar"
import {  X,Paperclip } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useRef , useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useEffect } from "react";
import { BlogSkeleton } from "../components/BlogSkeleton";


export const Publish = () => {
    const [title,setTitle] = useState<string>("");
    const [content,setContent] = useState<string>("");
    const [tag , setTag] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);// for displaying the selected images 
    const [loading , setLoading] = useState<boolean>(false);
    const [images,setimages] = useState<string[]>([]); // for storing the image url after uploading to cloudinary and sending to the server
    const createdAt = new Date().toISOString(); // current date and time in ISO format
    console.log("images from publish");
    console.log(images)
    const [local,setLocal] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token") === null){
            setLocal(false);
            setTimeout(()=>{
                navigate("/signin")
            },2000)
        }else setLocal(true);
    },[loading,navigate])

    if ( !local) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
            <BlogSkeleton/>
            
          </div>
        );
      }
    if(loading){
        return (
            <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-1 sm:p-6 md:p-10 overflow-x-hidden">

                <div className="flex items-center justify-center h-screen">
                    <div className="text-white text-2xl">Please wait image is processing</div>
                </div>
                
            </div>
        )
    }
    
    const handlePublish = async () => {
        try {
            console.log("Publishing blog with JSON payload");
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title,
            content,
            tag,
            createdAt,
            images: images
            }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + localStorage.getItem("token")
            }
            });

            console.log("Blog published successfully:", response.data);
           
            setLoading(false);
            navigate("/blogs");
        } catch (error) {
            console.error("Error publishing blog:", error);
        }
    };

    
    return (
        <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-1 sm:p-6 md:p-10 overflow-x-hidden">
            <div className="overflow-hidden">
                <AppBar userName="Pratham Raj" avatarUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"/>
            </div>

            <div  className="h-full  flex flex-col gap-5 items-center">
                {/* creating text editior */}

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-6 text-center">
                    What is on your mind?
                </h1>

                <div className="w-full max-w-7xl  rounded-lg shadow-lg">
                    <input className="w-full  p-5  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Title" value={title} onChange={(e)=>{
                        setTitle(e.target.value)
                    }} />
                </div>  
                
                <div className="w-full max-w-7xl  rounded-lg shadow-lg">
                    <Textarea
                        content={content}
                        setContent={setContent}
                        tag={tag}
                        setTag={setTag}
                        selectedImages={selectedImages}
                        setSelectedImages={setSelectedImages}
                        setLoading={setLoading}
                        setimages={setimages}
                    />
                    
                </div>
                <div>
                    <button  className="w-30 sm:w-50 bg-green-600 hover:bg-green-500 text-white text-sm p-2 rounded-full transition font-medium shadow-md  " onClick={handlePublish} >Publish</button>
                </div>
            </div>
           
        </div>
    )
}

function Textarea({content, setContent, tag, setTag, selectedImages, setSelectedImages,setLoading,setimages}:{
    content:string;
    setContent: (value: string) => void;
    tag:string;
    setTag: (value: string) => void;
    selectedImages: File[];
    setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
   
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    setimages: React.Dispatch<React.SetStateAction<string[]>>;

}) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    

    const handleIconClick = () =>{
        console.log(fileInputRef.current);
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
        target: HTMLInputElement & EventTarget & { files: FileList | null };
    }

    const handleFileChange = async (e: FileChangeEvent) => {
        const file: File | undefined = e.target.files ? e.target.files[0] : undefined;
        console.log("File changed:", file);
        if (!file) {
            console.log("No file is selected");
            return;
        }
        if (file) {
            console.log("File selected:", file.name);
            // post the image to cloudinary or get the url of the image or file
            setLoading(true);

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "BlogImages");
                formData.append("cloud_name", "db0hcdu39");

                const res = await axios.post<{ url: string }>("https://api.cloudinary.com/v1_1/db0hcdu39/image/upload", formData);
                console.log("Image uploaded successfully:", res.data.url);

                setSelectedImages((prev: File[]) => [file, ...prev]);
                setimages((prev: string[]) => [res.data.url, ...prev]);

            } catch (e) {
                alert("Image upload failed");
                console.error(e);
            }
            setLoading(false);
        }
    }
       
    return (
        <div className="w-full min-h[100] p-2  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-col sm:p-10">

            <div className="flex flex-col gap-8 ">
                <textarea   
                className="w-full h-70 p-2 "
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <input  className="mx-w[50] sm:w-50 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 p-1  " type="text" value={tag} onChange={(e)=>{setTag(e.target.value)}}  placeholder="    Important Tag" />
                <div className="flex flex-col gap-4 overflow-hidden">
                    

                    
                    <div className="bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 p-1 flex flex-wrap gap-2">
                        
                        <Paperclip className=" text-gray-400 cursor-pointer mt-1" onClick={handleIconClick}  type="file" />

                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden " ></input>
                        {selectedImages.map((image, index) => (
                            <div
                                key={index}
                                className="relative bg-gray-700 text-white rounded-md border border-gray-600 px-2 py-1 mt-2 max-w-[400px] break-words"
                            >
                                <span>{image.name}</span>
                                <X
                                size={16}
                                className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-500"
                                onClick={() => {
                                    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
                                    setimages((prev) => prev.filter((_, i) => i !== index));
                                }}
                                />
                            </div>
                        ))}

                    </div>
                </div>
                
            </div>
           
              
        </div>
        
    );
}