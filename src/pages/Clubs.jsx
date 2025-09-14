
import React, { useEffect, useState } from "react";
import ClubStat from '../cards/ClubStat';
import ClubListTable from "../tables/ClubListTable";
import Popup from "reactjs-popup";
import CreateClubForm from "../components/club/CreateClubForm";
import { getClubStat } from "../services/OverviewService";

const Clubs = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [isCreateClubPopupOpen, setIsCreateClubPopupOpen] = useState(false);
  const [clubStat, setClubStat] = useState({
    totalActiveClubs: 0,
    pendingClubRequests: 0,
    blockedClubs: 0
  });

  useEffect(() => {
    getClubStat().then(res => {
      if(res.success){
        setClubStat(res.data);
      }
    });
  }, []);

  const tabClasses = (tab) =>
    `px-20 py-2  rounded-xl transition     ${activeTab === tab
      ? "bg-white shadow text-black"
      : "text-gray-700 hover:text-custom-purple"
    }`;
  return (
    <div className="flex-1 bg-gray-50 h-screen px-8">
      <div className="flex justify-between items-center py-2">
        <h2 className="text-2xl font-bold mt-4 ">Clubs </h2>
        <button className="bg-custom-purple text-white px-4 py-2 rounded-lg hover:bg-custom-purple-lock transition" onClick={() => setIsCreateClubPopupOpen(true)}>
          + Create New Club
        </button>
      </div>

      {/* Club Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5 pt-2">
        <ClubStat title="Total Clubs" value={(clubStat.totalActiveClubs + clubStat.pendingClubRequests + clubStat.blockedClubs)} />
        <ClubStat title="Pending Requests" value={clubStat.pendingClubRequests} />
        <ClubStat title="Blocked Clubs" value={clubStat.blockedClubs} />
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
          Blocked Clubs
        </button>
      </div>

      {/* Tab Content */}
      <div className="text-center text-gray-800 pt-1">
        {activeTab === "active" && <div>
          <ClubListTable status="active" />
        </div>}
        {activeTab === "pending" && <ClubListTable status="pending" />}
        {activeTab === "blocked" && <ClubListTable status="blocked" />}
      </div>

      <Popup
        open={isCreateClubPopupOpen}
        modal
        closeOnDocumentClick={false}
        overlayStyle={{ background: "rgba(0,0,0,0.4)", zIndex: 1000 }}
        contentStyle={{
          padding: 0,
          border: "none",
          background: "transparent",
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
        }}
      >
        <CreateClubForm
          onClose={() => setIsCreateClubPopupOpen(false)}
          fireReload={() => window.location.reload()}
        />
      </Popup>

    </div>
  )
}
export default Clubs;
