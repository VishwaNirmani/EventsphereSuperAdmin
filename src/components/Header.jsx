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

      {/* Right: User info */}
      <div className="flex items-end justify-end w-full">
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