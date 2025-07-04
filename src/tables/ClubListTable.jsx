import React from 'react';

const ClubListTable = () => {
  const data = [
    { id: 1, name: "Uva Coders", members: 34, events: 5 },
    { id: 2, name: "Tech Titans", members: 27, events: 3 },
    { id: 3, name: "Cyber Squad", members: 18, events: 2 },
  ];

  return (

    <div className="overflow-x-auto">
      <table className="min-w-full text-left border border-gray-200 rounded-xl shadow-sm bg-white">
        <thead className="bg-purple-100 text-custom-purple">
          <tr>
            <th className="px-6 py-3 font-semibold">Club</th>
            <th className="px-6 py-3 font-semibold">Members</th>
            <th className="px-6 py-3 font-semibold">Events</th>
          </tr>
        </thead>
        <tbody>
          {data.map((club) => (
            <tr key={club.id} className="border-t hover:bg-indigo-100">
              <td className="px-6 py-3">{club.name}</td>
              <td className="px-6 py-3">{club.members}</td>
              <td className="px-6 py-3">{club.events}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ClubListTable;
