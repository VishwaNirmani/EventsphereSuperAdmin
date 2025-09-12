import { useEffect, useState } from "react";
import { Eye, Ban, CheckCircle2, XCircle, Unlock } from "lucide-react";
import { changeStatus, filterClubs, getActiveClubs, getBlockedClubs, getPendingApprovalClubs } from "../services/ClubService";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import ClubStatsPopup from "../components/club/ClubStatPopup";

export default function ClubList({ status = "active" }) {

  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [clubName, setClubName] = useState("");

  const handleSearch = () => {
    setIsLoading(true);
    const statusSearch = status === "active" ? "active" : status === "pending" ? "pending_approval" : "blocked"
    filterClubs(statusSearch, input, page).then(res => {
      setIsLoading(false);
      if (res.success) {
        setClubs(res.data);
      }
    });

  };

  const getClubs = () => {
    switch (status) {
      case "active":
        const req = getActiveClubs(page);
        req.then(response => {
          if (response.success) {
            setClubs(response.data);
          }
        });
        break;
      case "pending":
        const reqq = getPendingApprovalClubs(page);
        reqq.then(response => {
          if (response.success) {
            setClubs(response.data);
          }
        });
        break;
      case "blocked":
        const reqqq = getBlockedClubs(page);
        reqqq.then(response => {
          if (response.success) {
            setClubs(response.data);
          }
        });
        break;
    }
  }

  useEffect(() => {

    getClubs();

  }, [page]);

  const handleStatusChange = async (status, clubId) => {
    const res = await changeStatus(clubId, status);
    if (res.success) {
      toast.success("Successfully changed!");
      window.location.reload();
    } else {
      toast.error("Could not change to " + status);
    }
  }

  const renderButtons = (clubId) => {
    const commonButton = (
      <button
        className="flex items-center gap-1 text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
        onClick={() => {
          setSelectedClubId(clubId);
          setClubName(clubs.find(c=> c.id === clubId).name);
          setOpenView(true);
        }}
      >
        <Eye size={16} /> View
      </button>
    );

    switch (status) {
      case "active":
        return (
          <>
            {commonButton}
            <button
              className="flex items-center gap-1 text-sm px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
              onClick={() => handleStatusChange("BLOCKED", clubId)}
            >
              <Ban size={16} /> Block
            </button>
          </>
        );
      case "pending":
        return (
          <>
            {commonButton}
            <button
              className="flex items-center gap-1 text-sm px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
              onClick={() => handleStatusChange("ACTIVE", clubId)}
            >
              <CheckCircle2 size={16} /> Approve
            </button>
            <button
              className="flex items-center gap-1 text-sm px-3 py-1 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50 transition"
              onClick={() => handleStatusChange("BLOCKED", clubId)}
            >
              <XCircle size={16} /> Reject
            </button>
          </>
        );
      case "blocked":
        return (
          <>
            {commonButton}
            <button
              className="flex items-center gap-1 text-sm px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
              onClick={() => handleStatusChange("ACTIVE", clubId)}
            >
              <Unlock size={16} /> Activate
            </button>
          </>
        );
      default:
        return commonButton;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Search Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search clubs by name..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={`px-6 py-2 ${isLoading ? "bg-custom-purple-lock" : "bg-custom-purple"} text-white rounded-md hover:bg-custom-purple-lock transition`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Club Cards */}
      <div className="space-y-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-start gap-4 flex-col md:flex-row md:items-center">
              <img
                src={club.logo}
                alt={`${club.name} Logo`}
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold text-left">{club.name}</h2>
                <p className="text-sm text-gray-600 mt-1 text-left">{club.heading}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
              {renderButtons(club.id)}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        {/* Previous Button */}
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 1}
          className={`w-24 h-9 border rounded-full text-sm flex items-center justify-center 
        ${page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"}`}
        >
          ← Previous
        </button>

        {/* Next Button */}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={clubs.length < 5}
          className={`w-24 h-9 border rounded-full text-sm flex items-center justify-center 
        ${clubs.length < 5
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"}`}
        >
          Next →
        </button>
      </div>
      <Popup
        open={openView}
        modal
        closeOnDocumentClick={false}
        overlayStyle={{
          background: "rgba(0,0,0,0.4)",
          zIndex: 1000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem",
        }}
        contentStyle={{
          border: "none",
          boxShadow: "none",
          background: "transparent",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: "0.5rem",
          padding: "0",
          boxSizing: "border-box",
        }}
      >
        <ClubStatsPopup onClose={() => setOpenView(false)} clubId={selectedClubId} clubName={clubName}/>
      </Popup>
    </div>
  );
}