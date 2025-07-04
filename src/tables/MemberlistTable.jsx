import React from 'react';

const MemberlistTable = () => {
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', club: 'Tech Club',joineddate:'2025/01/01', role: 'Member' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', club: 'AI Club',joineddate:'2025/01/01', role: 'Club Admin' },
    { id: 3, name: 'Mike Lee', email: 'mike@example.com', club: 'Gaming Club',joineddate:'2025/01/01', role: 'Event Coordinator' },
  ];
  return (
    <div className="overflow-x-auto">
      
      <table className="min-w-full text-left border border-gray-200 rounded-xl shadow-sm bg-white">
        <thead className="bg-purple-100 text-custom-purple">
          <tr>
            <th className="px-6 py-3 font-semibold">Member ID</th>
            <th className="px-6 py-3 font-semibold">Name</th>
            <th className="px-6 py-3 font-semibold">Email</th>
            <th className="px-6 py-3 font-semibold">Club</th>
            <th className="px-6 py-3 font-semibold">Joined Date</th>
            <th className="p-3">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {members.length > 0 ? (
            members.map((member, index) => (
              <tr key={member.id} className="border-t hover:bg-indigo-100">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{member.name}</td>
                <td className="px-6 py-3">{member.email}</td>
                <td className="px-6 py-3">{member.club}</td>
                <td className="px-6 py-3">{member.joineddate}</td>
                <td className="px-6 py-3">{member.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-gray-500">
                No members found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberlistTable;
