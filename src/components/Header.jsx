import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { decodedValues } from "../utils/TokenService";

const Header = ({ toggleSidebar, user }) => {
  const [name, setName] = useState("Super Admin");

  useEffect(() => {
    const decodedToken = decodedValues();
    if (decodedToken && decodedToken.firstName && decodedToken.lastName) {
      setName(`${decodedToken.firstName} ${decodedToken.lastName}`);
    }
  });

  return (
    <div className="h-16 bg-white border-b flex items-center px-6 shadow-sm justify-between z-10">

      {/* Center: Optional search bar */}
      <div className="flex-1 mx-6 hidden md:block">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      {/* Right: User info */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">{name || "Super Admin"}</span>
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=0D8ABC&color=fff`}
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;