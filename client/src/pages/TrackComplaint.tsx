import React, { useState } from 'react';

const TrackComplaint: React.FC = () => {
  const [complaintId, setComplaintId] = useState('');
  const [complaintStatus, setComplaintStatus] = useState<string | null>(null);

  const handleTrack = () => {
    // Here you would typically make an API call to get the complaint status
    setComplaintStatus('Your complaint is currently being processed. Expected resolution date: 15/09/2024');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="complaintId">
          Complaint ID
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="complaintId"
          type="text"
          placeholder="Enter your complaint ID"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleTrack}
        >
          Track Complaint
        </button>
      </div>
      {complaintStatus && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p className="text-gray-700">{complaintStatus}</p>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;