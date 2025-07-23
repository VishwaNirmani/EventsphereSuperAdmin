import React from 'react'
import CountUp from "react-countup";
import ClubListTable from '../tables/ClubListTable';
import OverviewStat from '../cards/OverviewStat';
import Header from '../components/Header';
import EventTable from '../tables/EventTable';



const Dashboard = () => {
  const data = [
    { id: 1, name: "Uva Coders", members: 34, events: 5 },
    { id: 2, name: "Tech Titans", members: 27, events: 3 },
    { id: 3, name: "Cyber Squad", members: 18, events: 2 },
  ];
  const totalEvents = 12; // example count

  return (
    <div className='flex-1 bg-gray-50 h-screen'>

      <div className='px-8'>
        <h2 className='text-2xl font-bold mt-4'>Overview</h2>

        {/* cards-- overview statics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-6 pt-2">
          <OverviewStat title="Total Events" value={50} />
          <OverviewStat title="Total Members" value={50} />
          <OverviewStat title="Total Clubs" value={50} />
          <OverviewStat title="Total Requests" value={50} />
        </div>
        
      </div>

    </div>
  )
}
export default Dashboard;