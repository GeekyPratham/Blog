export const Hamburger = () => {
  return (
    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </div>
  );
}