
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import { Hamburger } from "./Hamburger"; 
import { Ham } from "lucide-react";
interface AppBarProps {
  userName: string;
  avatarUrl: string;
}

export const AppBar = ({ userName, avatarUrl }: AppBarProps) => {
  const navigate = useNavigate();
  const [isHamburgerOpen,setHamburgerOpen] = useState<boolean>(false);

  return (
    <div className=" w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 px-6 shadow-md flex flex-wrap justify-between items-center l">
      {/* Left: Username */}
      <Link to={"/blogs"}>
        <div className="text-lg font-semibold text-green-400">Welcome, {userName}</div>
      </Link>

      {/* Right: Actions */}
      <div className=" flex items-center gap-4">
        <button className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-1.5 rounded-full transition font-medium shadow-md" onClick={()=>{
          navigate("/publish")
        }}>
          Published
        </button>
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-9 h-9 rounded-full border-2 border-violet-500 shadow-md cursor-pointer"
          onClick={()=>{
            setHamburgerOpen(true);
          }}
        />
        {
          isHamburgerOpen && (
            <div className="absolute top-16 right-10 bg-gray-800 rounded_lg shadow-lg p-4 z-50">
              
            </div>
          )
        }
      </div>
    </div>
  );
};