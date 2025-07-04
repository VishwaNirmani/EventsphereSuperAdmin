import React from 'react'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { hover } from '@testing-library/user-event/dist/hover';

const Sidebar = ({ isOpen }) => {
 

  return (
    <div className={`fixed top-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 h-screen
  flex flex-col justify-between
  ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

      


      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-15 mb-2 felx-none " />

      {/* Menu */}
      <ul className="text-lg flex-grow py-16">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 pl-5 py-1  text-white bg-custom-purple   '
                : ' flex items-center gap-2 pl-5 py-1  text-gray-600 hover:bg-[rgba(121,132,208,0.3)]'
            }
          >
            <MdOutlineSpaceDashboard /> Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clubs"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 pl-5 py-1  text-white bg-custom-purple   '
                : ' flex items-center gap-2 pl-5 py-1  text-gray-600 hover:bg-[rgba(121,132,208,0.3)]'
            }
          >
            <IoHomeOutline /> Clubs
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 pl-5 py-1  text-white bg-custom-purple   '
                : ' flex items-center gap-2 pl-5 py-1  text-gray-600 hover:bg-[rgba(121,132,208,0.3)]'
            }
          >
            <MdOutlineEventAvailable />Events
          </NavLink>

        </li>

        <li>
          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-2 pl-5 py-1  text-white bg-custom-purple   '
                : ' flex items-center gap-2 pl-5 py-1  text-gray-600 hover:bg-[rgba(121,132,208,0.3)]'
            }
          >
            <HiOutlineUsers />Members

          </NavLink>
        </li>


      </ul>

      {/* Logout btn */}
      <div className='mb-6'>
        <button className='hover:text-red-400 cursor-pointer flex items-center gap-2 pl-5'>
          <IoLogOutOutline />LogOut
        </button>
      </div>

    </div>
  )
}
export default Sidebar;