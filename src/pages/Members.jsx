import React from 'react'
import MembersStat from '../cards/MembersStat';
import MemberlistTable from '../tables/MemberlistTable';
import Header from '../components/Header';

const Members = () => {
  // Sample data
  const members = [
    { id: 1, name: 'John Doe', email: 'john@example.com', club: 'Tech Club', role: 'Member' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', club: 'AI Club', role: 'Club Admin' },
    { id: 3, name: 'Mike Lee', email: 'mike@example.com', club: 'Gaming Club', role: 'Event Coordinator' },
  ];
  return (
    <div className='flex-1 bg-gray-50 h-screen'>

      <div className='px-8'>
        <h2 className="text-2xl font-bold mt-4">Members</h2>

         {/* Members stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <MembersStat title="Total Members" value={32} />
      </div>

      {/* members table */}
      <div className='bg-white shadow-md rounded p-4 mt-6'>
        <h3 className="text-xl font-semibold mb-4">All Members</h3>
        <MemberlistTable />
      </div>
      </div>

     

    </div>
  )
}
export default Members;