import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaTicketAlt, FaUsers, FaDollarSign, FaMoneyBillWave } from "react-icons/fa";
import { format } from "date-fns";
import ConfirmDialog from "../components/other/ConfirmDialog";
import { deleteEvent, getAllEventStat, getEventsPurchaseStat, getOwnedEvents } from "../services/EventService";
import { FiSearch, FiFilter } from "react-icons/fi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import Popup from "reactjs-popup";
import CreateEventForm from "../components/CreateEventForm";
import { useSearchParams } from "react-router-dom";

const Event = () => {
  const [searchParams] = useSearchParams();
  const clubName = searchParams.get("name");
  const [events, setEvents] = useState([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [dateStatus, setDateStatus] = useState("all");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [stats, setStat] = useState({
    ticketsSold: 0,
    participants: 0,
    revenue: 0,
    activeEvents: 0
  });
  const [eventStat, setEventStat] = useState(null);

  useEffect(() => {

    setIsLoading(true);
    getOwnedEvents(dateStatus, title).then(res => {
      setIsLoading(false);
      if (res.success) {
        setEvents(res.data);
        console.log(res.data);
      } else {
        setError(res.message);
      }
    })

  }, [dateStatus, title]);

  useEffect(() => {
    getAllEventStat().then(res => {
      if (res.success) {
        setStat(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      getEventsPurchaseStat(selectedEvent.eventId).then(res => {
        if (res.success) {
          setEventStat(res.data);
        }
      });
    }
  }, [selectedEvent]);

  const createForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative max-h-screen overflow-y-auto">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>
        <CreateEventForm onCancel={() => setShowForm(false)} />
      </div>
    );
  }

  const updateForm = () => {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl relative max-h-screen overflow-y-auto">
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          ×
        </button>
        <CreateEventForm onCancel={() => setShowForm(false)} isUpdate={true} event={selectedEventData} />
      </div>
    );
  }

  const onDelete = () => {
    setIsLoading(true);
    deleteEvent(selectedEventId).then(res => {
      setIsLoading(false);
      if (res.success) {
        setIsConfirmOpen(false);
        window.location.reload();
      }
    });
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{clubName}'s Events</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setShowUpdateForm(false);
            setSelectedEventData(null);
          }}
          className="flex items-center bg-custom-purple text-white px-4 py-2 rounded-lg shadow hover:bg-custom-purple-lock transition"
        >
          <FaPlus className="mr-2" /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaTicketAlt className="text-purple-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Tickets Sold</p>
            <p className="text-lg font-bold">{stats.ticketsSold}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaUsers className="text-green-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Participants</p>
            <p className="text-lg font-bold">{stats.participants}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaDollarSign className="text-yellow-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-lg font-bold">LKR {stats.revenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <FaEdit className="text-blue-600 text-xl mr-3" />
          <div>
            <p className="text-sm text-gray-500">Active Events</p>
            <p className="text-lg font-bold">{stats.activeEvents}</p>
          </div>
        </div>
      </div>

      {/* Search events filter */}
      <div className="w-full bg-white rounded-xl shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between">
        {/* Tabs Section */}
        <div className="flex gap-2 flex-wrap">
          {["all", "open", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setDateStatus(tab);
              }}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${dateStatus === tab
                ? "bg-custom-purple text-white"
                : "bg-gray-100 text-gray-700"
                }`}
            >
              {tab === "all" && "All"}
              {tab === "open" && "Active"}
              {tab === "past" && "Past"}
            </button>
          ))}
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search event"
              className="border rounded-full pl-10 pr-4 py-1 text-sm w-52 md:w-64 bg-gray-100"
              onChange={e => setTitle(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.eventId}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedEvent(event);
                }}
              >
                <td className="px-4 py-3">{event.title}</td>
                <td className="px-4 py-3">{event.type}</td>
                <td className="px-4 py-3">{format(event.eventDate, "PPP p")}</td>
                <td className="px-4 py-3">
                  {event.bookingRequired ? "Required" : "Not Required"}
                </td>
                <td className="px-4 py-3">{new Date(event.eventDate) < new Date() ? "PAST" : "ACTIVE"}</td>
                <td
                  className="px-4 py-3 text-center space-x-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setShowUpdateForm(true);
                      setSelectedEventData(event);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={() => {
                      setSelectedEventId(event.eventId);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Details Popup */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[700px] relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>

            {/* Header Image */}
            <img
              src={selectedEvent.mainPhoto}
              alt={selectedEvent.title}
              className="w-full h-52 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedEvent.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{selectedEvent.type}</p>

              {/* Event Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-gray-700">
                  <strong>Date:</strong> {format(selectedEvent.eventDate, "PPP p")}
                </div>
                <div className="text-gray-700">
                  <strong>Status:</strong> {selectedEvent.status}
                </div>
                <div className="text-gray-700">
                  <strong>Booking:</strong>{" "}
                  {selectedEvent.bookingRequired ? "Required" : "Not Required"}
                </div>
                {selectedEvent.bookingRequired && (
                  <div className="text-gray-700">
                    <strong>Seats:</strong>{" "}
                    {selectedEvent.bookedSeats}/{selectedEvent.seats} (
                    {selectedEvent.price} LKR each)
                  </div>
                )}
                <div className="col-span-2 text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  {selectedEvent.address}
                </div>
              </div>

              {/* Purchase Statistics */}
              {eventStat ? (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Ticket Statistics
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm">
                      <FaTicketAlt className="text-blue-600 text-xl mx-auto mb-1" />
                      <p className="text-gray-800 font-bold">{eventStat.ticketsPurchased}</p>
                      <p className="text-sm text-gray-600">Tickets Purchased</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center shadow-sm">
                      <FaUsers className="text-green-600 text-xl mx-auto mb-1" />
                      <p className="text-gray-800 font-bold">{eventStat.peopleAttended}</p>
                      <p className="text-sm text-gray-600">People Attended</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center shadow-sm">
                      <FaMoneyBillWave className="text-yellow-600 text-xl mx-auto mb-1" />
                      <p className="text-gray-800 font-bold">{eventStat.totalRevenue} LKR</p>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  Loading statistics...
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        message={"Are you sure you want to delete this event?"}
        onCancel={() => setIsConfirmOpen(false)}
        open={isConfirmOpen}
        title={"Confirm deleting event"}
        onConfirm={onDelete}
        isLoading={isLoading}
      />
      {/* Create Event Modal */}
      <Popup
        open={showForm}
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
        {showUpdateForm ? updateForm() : createForm()}
      </Popup>
    </div>
  );
};

export default Event;