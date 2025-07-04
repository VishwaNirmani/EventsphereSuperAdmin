import React from 'react'
import { HiOutlineBell } from "react-icons/hi2";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
  return (
    <div className='fixed top-0 left-64 right-0 h-16 bg-white border-b flex items-center px-6 shadow-sm justify-between z-50'>


    {/* toggle button */}
     <button onClick={toggleSidebar} className="">
        <Menu className="w-6 h-6" />
      </button>
      <div className='text-base md:text-lg font-semibold text-gray-700 p-5 '>
          EventSphere
      </div>

      <div className='flex items-center space-x-4'>

        <input type="text" placeholder="Search..." className='hidden md:block px-3 py-1.5 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300' />

        <button className="relative text-gray-600 hover:text-black">
          <HiOutlineBell className="w-5 h-5" />
          
        </button>


      </div>

    
      
    </div>
  )
}
export default Header;