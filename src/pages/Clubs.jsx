
import React, { useState } from "react";
import ClubStat from '../cards/ClubStat';
import ClubListTable from "../tables/ClubListTable";
import PendingClubsTable from '../tables/PendigClubsTable';

const Clubs = () => {
   const [activeTab, setActiveTab] = useState("active");

  const tabClasses = (tab) =>
    `px-20 py-2  rounded-xl transition     ${
      activeTab === tab
        ? "bg-white shadow text-black"
        : "text-gray-700 hover:text-custom-purple"
    }`;
  return (
   <div className="flex-1 bg-gray-50 h-screen py-20 px-8">
    <h2 className="text-2xl font-bold mt-4 ">Clubs </h2>

         {/* Club Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5 pt-2">
        <ClubStat title="Total Clubs" value={32} />
        <ClubStat title="Pending Requests" value={4} />
        <ClubStat title="Blocked Clubs" value={2} />
      </div>

      {/* Tab Header */}
      <div className="flex justify-center space-x-3 bg-gray-200 rounded-xl py-1 max-w-4xl mx-auto">
        <button className={tabClasses("active")} onClick={() => setActiveTab("active")}>
          Active Clubs
        </button>
        <button className={tabClasses("pending")} onClick={() => setActiveTab("pending")}>
          Pending Clubs
        </button>
        <button className={tabClasses("blocked")} onClick={() => setActiveTab("blocked")}>
          Bloked Clubs
        </button>
      </div>

      {/* Tab Content */}
      <div className="text-center text-gray-800 pt-1">
        {activeTab === "active" && <p><div className=' shadow-md rounded p-4 '>
        <h3 className="text-xl font-semibold mb-4">All Clubs</h3>
        <ClubListTable />
      </div></p>}
        {activeTab === "pending" && <p><PendingClubsTable /></p>}
        {activeTab === "blocked" && <p>No Blocked Clubs</p>}
      </div>
    </div>
  )
}
export default Clubs;
