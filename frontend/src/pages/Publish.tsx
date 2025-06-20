import { AppBar } from "../components/AppBar"
import {  X,Paperclip } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useRef , useState } from "react";
import axios from "axios";
export const Publish = () => {
    const [title,setTitle] = useState<string>("");
    const [content,setContent] = useState<string>("");
    const [tag , setTag] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    

    const navigate = useNavigate();

    const handlePublish = () =>{
        // Here you can handle the publish logic, e.g., send the data to a server
        console.log("Title:", title);
        console.log("Content:", content);
        console.log("Tag:", tag);
        console.log("Selected Images:", selectedImages);
        
        // Reset the form after publishing
        setTitle("");
        setContent("");
        setTag("");
        setSelectedImages([]);
        try{
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("tag", tag);
            selectedImages.forEach((image, index) => {
                formData.append(`image_${index}`, image);
            });
            // Send the form data to the server
            axios.post("https://backend.kprathamraj2021.workers.dev/api/v1/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log("Blog published successfully:", response.data);
                // Redirect to the blogs page or show a success message
                navigate("/blogs");
            })
        }catch(error) {
            console.error("Error publishing blog:", error);
        }
    }
    return (
        <div className="min-h-screen flex flex-col gap-6 text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-1 sm:p-6 md:p-10 overflow-x-hidden">
            <div className="overflow-hidden">
                <AppBar userName="Pratham Raj" imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"/>
            </div>

            <div  className="h-full  flex flex-col gap-5 items-center">
                {/* creating text editior */}

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-300 mb-6 text-center">
                    What is on your mind?
                </h1>

                <div className="w-full max-w-7xl  rounded-lg shadow-lg">
                    <input className="w-full  p-5  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Title" onChange={(e)=>{
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
                    />
                    
                </div>
                <div>
                    <button  className="w-30 sm:w-50 bg-green-600 hover:bg-green-500 text-white text-sm p-2 rounded-full transition font-medium shadow-md  " onClick={handlePublish} >Publish</button>
                </div>
            </div>
           
        </div>
    )
}

function Textarea({content, setContent, tag, setTag, selectedImages, setSelectedImages}:{
    content:string;
    setContent: (value: string) => void;
    tag:string;
    setTag: (value: string) => void;
    selectedImages: File[];
    setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>;
}) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    

    const handleIconClick = () =>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }
    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        
        if(file){
            console.log("File selected:", file.name);
            
            // we can handle the file upload here, e.g., send it to a server or process it
            setSelectedImages((prevImages: File[]) => [...prevImages, file]);
        }
    }
       
    return (
        <div className="w-full min-h[100] p-2  bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex flex-col sm:p-10">

            <div className="flex flex-col gap-8 ">
                <textarea   
                className="w-full h-70 p-2 "
                placeholder="Write your blog content here..."
                onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <input  className="mx-w[50] sm:w-50 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 p-1  " type="text"
                    onChange={(e)=>{setTag(e.target.value)}}  placeholder="    Important Tag" />
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
                                onClick={() =>
                                    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
                                }
                                />
                            </div>
                        ))}

                    </div>
                </div>
                
            </div>
           
              
        </div>
        
    );
}