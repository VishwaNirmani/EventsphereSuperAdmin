import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineSpaceDashboard,
  MdOutlineEventAvailable,
} from "react-icons/md";
import {
  HiOutlineUsers
} from "react-icons/hi2";
import {
  IoHomeOutline,
  IoLogOutOutline
} from "react-icons/io5";
import {
  FiSettings,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import useAuth from '../hooks/useAuth';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {logoutUser} = useAuth();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 h-full bg-white border-r border-gray-200 shadow-xl flex flex-col justify-between transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Top: Logo & Collapse Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center justify-center w-full">
            <img
              src="/logo.png"
              alt="EventSphere Logo"
              className={`transition-all duration-300 h-8 ${
                collapsed ? 'hidden' : 'block'
              }`}
            />
          </div>
          <button
            className="hidden md:block text-gray-600 hover:text-black transition ml-2"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-2 py-4">
          {!collapsed && (
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              Navigation
            </div>
          )}
          <ul className="space-y-1 text-sm font-medium text-gray-700">
            <NavItem
              to="/"
              icon={<MdOutlineSpaceDashboard size={18} />}
              label="Overview"
              collapsed={collapsed}
              exact
            />
            <NavItem
              to="/clubs"
              icon={<IoHomeOutline size={18} />}
              label="Clubs"
              collapsed={collapsed}
            />
            <NavItem
              to="/events"
              icon={<MdOutlineEventAvailable size={18} />}
              label="Events"
              collapsed={collapsed}
            />
            <NavItem
              to="/members"
              icon={<HiOutlineUsers size={18} />}
              label="Members"
              collapsed={collapsed}
            />
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              collapsed ? 'justify-center' : 'justify-center gap-2'
            } px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition`}
          >
            <IoLogOutOutline size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

// Reusable NavItem Component
function NavItem({ to, icon, label, collapsed, exact = false }) {
  return (
    <li>
      <NavLink
        to={to}
        end={exact}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? 'bg-custom-purple text-white shadow-sm'
              : 'hover:bg-gray-100 text-gray-700'
          } ${collapsed ? 'justify-center' : ''}`
        }
      >
        {icon}
        {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      </NavLink>
    </li>
  );
}

export default Sidebar;