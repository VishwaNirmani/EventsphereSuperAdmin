import React from 'react';
import CountUp from 'react-countup';
import ClubListTable from '../tables/ClubListTable';
import OverviewStat from '../cards/OverviewStat';
import Header from '../components/Header';
import EventTable from '../tables/EventTable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const eventData = [
    { month: "Jan", events: 22 },
    { month: "Feb", events: 18 },
    { month: "Mar", events: 30 },
    { month: "Apr", events: 25 },
    { month: "May", events: 35 },
    { month: "Jun", events: 28 },
  ];

  const recentUpdates = [
    { message: "New event 'CodeFest' approved", time: "2 hours ago" },
    { message: "User JohnDoe requested club registration", time: "5 hours ago" },
    { message: "Monthly report generated", time: "Yesterday" },
  ];

  const recentUsers = [
    { name: "Alice Silva", role: "Member", joined: "2025-07-25" },
    { name: "Daniel Perera", role: "Club Admin", joined: "2025-07-24" },
    { name: "Ravi Senanayake", role: "Member", joined: "2025-07-23" },
  ];

  const pendingClubs = [
    { name: "AI Explorers", owner: "Ishan", status: "Pending" },
    { name: "Green Warriors", owner: "Nadeesha", status: "Pending" },
  ];

  return (
    <div className="flex-1 bg-gray-50 min-h-screen px-8 py-6">
      
      <h2 className="text-2xl font-bold mb-4">Super Admin Dashboard</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6">
        <OverviewStat title="Total Events" value={126} />
        <OverviewStat title="Total Members" value={512} />
        <OverviewStat title="Total Clubs" value={48} />
        <OverviewStat title="Total Requests" value={12} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Events in Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={eventData}>
              <XAxis dataKey="month" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#5A67BA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Updates */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Updates</h3>
          <ul className="space-y-3">
            {recentUpdates.map((update, idx) => (
              <li key={idx} className="flex flex-col border-b pb-2">
                <span className="text-gray-800 font-medium">{update.message}</span>
                <span className="text-sm text-gray-500">{update.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Management Shortcut */}
      <div className="bg-white mt-6 shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Users</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Role</th>
              <th className="py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Club Management Section */}
      <div className="bg-white mt-6 shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Pending Club Requests</h3>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Club Name</th>
              <th className="py-2">Owner</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingClubs.map((club, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{club.name}</td>
                <td className="py-2">{club.owner}</td>
                <td className="py-2">{club.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
