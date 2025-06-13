interface AppBarProps {
  userName: string;
  imageUrl: string;
}

export const AppBar = ({ userName, imageUrl }: AppBarProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
      {/* Left: Username */}
      <div className="text-lg font-semibold text-green-400">Welcome, {userName}</div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-1.5 rounded-full transition font-medium shadow-md">
          Published
        </button>
        <img
          src={imageUrl}
          alt="User Avatar"
          className="w-9 h-9 rounded-full border-2 border-violet-500 shadow-md"
        />
      </div>
    </div>
  );
};