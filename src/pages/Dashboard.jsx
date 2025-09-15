import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaUsers,
  FaCalendarAlt,
  FaUniversity,
  FaClipboardList,
} from "react-icons/fa";
import { getOverview } from "../services/OverviewService";

const Dashboard = () => {

  const [eventData, setEventData] = useState([
    { month: "Jan", events: 0 },
    { month: "Feb", events: 0 },
    { month: "Mar", events: 0 },
    { month: "Apr", events: 0 },
    { month: "May", events: 0 },
    { month: "Jun", events: 0 }
  ]);

  const [clubData, setClubData] = useState([
    { month: "Jan", clubs: 0 },
    { month: "Feb", clubs: 0 },
    { month: "Mar", clubs: 0 },
    { month: "Apr", clubs: 0 },
    { month: "May", clubs: 0 },
    { month: "Jun", clubs: 0 }
  ]);

  const [stat, setStat] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalActiveClubs: 0,
    pendingClubRequests: 0
  });

  useEffect(() => {
    getOverview().then(res => {
      if(res.success){
        setStat(res.data.adminStat);
        setEventData(res.data.monthlyEvents);
        setClubData(res.data.monthlyClubs);
      }
    });
  }, []);

  return (
    <div className="flex-1 bg-gray-50 min-h-screen px-8 py-6">
      {/* Welcome Title */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          👋 Welcome Back, <span className="text-indigo-600">Super Admin</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Here’s an overview of your platform performance at a glance
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <FaCalendarAlt size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Events</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stat.totalEvents} duration={2} />
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stat.totalUsers} duration={2} />
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <FaUniversity size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Clubs</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stat.totalActiveClubs} duration={2} />
            </h3>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <FaClipboardList size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <h3 className="text-xl font-bold text-gray-800">
              <CountUp end={stat.pendingClubRequests} duration={2} />
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Events in Last Months
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={eventData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Clubs in Last Months
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={clubData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clubs" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;