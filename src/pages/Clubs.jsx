import React from 'react'
import PendingClubsTable from '../tables/PendigClubsTable';
import ClubListTable from '../tables/ClubListTable';
import ClubStat from '../cards/ClubStat';
import Header from '../components/Header';

export default function Clubs() {
  return (
    <div className='flex-1 bg-gray-50 h-screen'>

      <div className='py-5 px-8'>
        <h2 className="text-2xl font-bold mt-4 ">Clubs </h2>

         {/* Club Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5 pt-2">
        <ClubStat title="Total Clubs" value={32} />
        <ClubStat title="Pending Requests" value={4} />
        <ClubStat title="Blocked Clubs" value={2} />
      </div>

      {/* Pending Clubs Table */}
      <PendingClubsTable />

      {/* Club list table */}
      <div className='bg-white shadow-md rounded p-4 mt-6'>
        <h3 className="text-xl font-semibold mb-4">All Clubs</h3>
        <ClubListTable />
      </div>

      </div>

     

    </div>
  )
}
