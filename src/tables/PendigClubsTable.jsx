import React, { useState } from 'react';

const PendingClubsTable = () => {
  const [clubs, setClubs] = useState([
    { id: 1, name: "Tech Innovators", owner: "John", email: "john@mail.com" },
    { id: 2, name: "Art Fusion", owner: "Sara", email: "sara@mail.com" },
  ]);

  const handleApprove = (id) => {
    // send API call here
    setClubs(clubs.filter(club => club.id !== id));
  };

  const handleReject = (id) => {
    // send API call here
    setClubs(clubs.filter(club => club.id !== id));
  };
  return (
    <div>
       <div className=" rounded shadow-md p-4">
      {/* <h3 className="text-xl font-semibold mb-4">Pending Club Requests</h3> */}
      <table className="min-w-full text-left border border-gray-200 rounded-xl shadow-sm bg-white">
        <thead className='bg-purple-100 text-custom-purple'>
          <tr >
            <th className="px-6 py-3 font-semibold">Club Name</th>
            <th className="px-6 py-3 font-semibold">Owner</th>
            <th className="px-6 py-3 font-semibold">Email</th>
            <th className="px-6 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clubs.map((club) => (
            <tr key={club.id} className="border-b hover:bg-indigo-100">
              <td className="px-6 py-3">{club.name}</td>
              <td className="px-6 py-3">{club.owner}</td>
              <td className="px-6 py-3">{club.email}</td>
              <td className="px-6 py-3 space-x-2">
                <button
                  onClick={() => handleApprove(club.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(club.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {clubs.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No pending requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default PendingClubsTable
