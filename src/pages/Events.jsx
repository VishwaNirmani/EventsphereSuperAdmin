import React from 'react';
import EventTable from '../tables/EventTable';
import EventStat from '../cards/EventStat';
import Header from '../components/Header';


const Events = () => {
  return (
    <div className="flex-1 bg-gray-50 h-screen">

      <div className='py-5 px-8'>
        <h2 className="text-2xl font-bold mt-4 ">Events </h2>

        {/*Event Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        <EventStat title="Total Events" value={32} />
        <EventStat title="Approved Events" value={4} />
        <EventStat title="Pending Approval" value={2} />
        <EventStat title="Rejected Events" value={2} />
      </div>

      {/* Event Table */}
      <div className='bg-white shadow-md rounded p-4 mt-6 '>
        <h3 className="text-xl font-semibold mb-4">All Eventsx</h3>
        <EventTable />
      </div>
      </div>

      

    </div>
  );
};



export default Events;

