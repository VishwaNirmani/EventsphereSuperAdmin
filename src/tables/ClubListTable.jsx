import { useState } from "react";
import { Eye, Ban, CheckCircle2, XCircle, Unlock } from "lucide-react";

export default function ClubList({ status = "active" }) {

  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "Art & Design Club",
      logoUrl: "https://via.placeholder.com/60x60?text=Logo1",
      header: "Empowering youth through creativity",
    },
    {
      id: 2,
      name: "Coding Geeks",
      logoUrl: "https://via.placeholder.com/60x60?text=Logo2",
      header: "We code. We build. We learn.",
    },
    {
      id: 3,
      name: "Music Lovers",
      logoUrl: "https://via.placeholder.com/60x60?text=Logo3",
      header: "Bringing harmony to campus life",
    },
  ]);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClubs.length / itemsPerPage);
  const paginatedClubs = filteredClubs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearch = () => {
    setSearch(input);
    setPage(1);
  };

  const renderButtons = (clubId) => {
    const commonButton = (
      <button
        className="flex items-center gap-1 text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
        onClick={() => console.log("View", clubId)}
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
              onClick={() => console.log("Block", clubId)}
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
              onClick={() => console.log("Approve", clubId)}
            >
              <CheckCircle2 size={16} /> Approve
            </button>
            <button
              className="flex items-center gap-1 text-sm px-3 py-1 border border-yellow-600 text-yellow-600 rounded hover:bg-yellow-50 transition"
              onClick={() => console.log("Reject", clubId)}
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
              onClick={() => console.log("Activate", clubId)}
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
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Club Cards */}
      <div className="space-y-6">
        {paginatedClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white border rounded-xl shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="flex items-start gap-4 flex-col md:flex-row md:items-center">
              <img
                src={club.logoUrl}
                alt={`${club.name} Logo`}
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold">{club.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{club.header}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0 flex-wrap">
              {renderButtons(club.id)}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`w-9 h-9 border rounded-full text-sm ${page === index + 1
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}