import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[260px_1fr] grid-rows-[auto_1fr] grid-areas-layout h-screen ">
      <aside className="row-span-2">
        <Sidebar/>
      </aside>
      <header className=''>
        <Header/>
      </header>
        
      
      <main className="bg-gray-50  ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
