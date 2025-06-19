import { AppBar } from "../components/AppBar"
import {  Paperclip } from 'lucide-react';

export const Publish = () => {

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <div className="overflow-hidden">
                <AppBar userName="Pratham Raj" imageUrl="https://res.cloudinary.com/db0hcdu39/image/upload/v1745947431/iiem9tlkzzui2djbo9nk.jpg"/>
            </div>

            <div  className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-10 px-4 flex flex-col gap-5 items-center">
                {/* creating text editior */}

                <div className="w-full max-w-7xl  p-4 rounded-lg shadow-lg">
                    <input className="w-full  p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="Title" />
                </div>  
                
                <div className="w-full max-w-7xl  p-4 rounded-lg shadow-lg">
                    <Textarea/>
                    
                    

                </div>
            </div>
           
        </div>
    )
}

function Textarea() {
   
    return (
        <div >
            <textarea
            className="w-full h-96 p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your blog content here..."
            ></textarea>
            <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer" type="file" />
        </div>
        
    );
}