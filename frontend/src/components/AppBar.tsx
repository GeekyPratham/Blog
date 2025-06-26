
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
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
        {isHamburgerOpen && (
        <>
          {/*  Background Blur Overlay */}
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setHamburgerOpen(false)}
          ></div>

          {/* Hamburger Menu Box with Animation */}
          <div className="fixed top-24 right-6 sm:right-20 w-48 sm:w-52 bg-green-700 rounded-lg shadow-lg z-50 transform scale-95 sm:scale-100 transition-all duration-300 ease-out">
            <X
              size={20}
              className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full p-0.5 cursor-pointer hover:bg-red-500"
              onClick={() => setHamburgerOpen(false)}
            />
            <div className="flex flex-col items-center justify-center h-full py-6 gap-4 text-white">
              <div className="cursor-pointer hover:underline">Edit Profile</div>
              <div className="cursor-pointer hover:underline" onClick={()=>{
                localStorage.removeItem("token");
                navigate("/signin");
              }}>Forget</div>
            </div>
          </div>
        </>
      )}

      </div>
    </div>
  );
}; 