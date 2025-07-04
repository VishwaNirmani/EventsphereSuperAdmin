import React from 'react'
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

function EventTable() {
  return (
    <div className="overflow-x-auto">
      
        <table className="min-w-full text-left border border-gray-200 rounded-xl shadow-sm bg-white">
          <thead className="bg-purple-100 text-custom-purple">
            <tr>
              <th className="px-6 py-3 font-semibold">Event Name</th>
              <th className="px-6 py-3 font-semibold">Club</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              <th className="px-6 py-3 font-semibold">Attendees</th>
              <th className="px-6 py-3 font-semibold">Status</th>
             
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* Map events here */}
            <tr className='border-t hover:bg-indigo-100 '>
              <td className="px-6 py-3">Tech Talk</td>
              <td className="px-6 py-3">Code Club</td>
              <td className="px-6 py-3">2025-07-10</td>
              <td className="px-6 py-3">120</td>
              <td className="px-6 py-3 text-blue-600">Upcoming</td>
              
            </tr>
          </tbody>
        </table>
     
    </div>
  )
}

export default EventTable
