import React, { useState } from "react";
import apiClient from "../config/axios";

const TrackComplaint: React.FC = () => {
  const [refno, setRefno] = useState("");
  const [complaintStatus, setComplaintStatus] = useState<string | null>(null);

  const handleTrack = async () => {
    setComplaintStatus(null);
    if (!refno) {
      setComplaintStatus("Please enter a reference number");
      return;
    }
    try {
      const response = await apiClient.get(`/track-complaint`, {
        params: { refno },
      });
      if (response.data.success) {
        const complaintData = response.data.data;
        const formattedData = Array.isArray(complaintData)
          ? complaintData
              .map((item) => `Ref No: ${item.refno}, Status: ${item.status}`)
              .join("\n")
          : `Ref No: ${complaintData.refno}, Status: ${complaintData.status}`;

        setComplaintStatus(response.data.message + "\n" + formattedData);
      } else {
        setComplaintStatus(
          "No complaint found with the given reference number"
        );
      }
    } catch (error) {
      setComplaintStatus("Some error happened. Please try again later");
    }
    setRefno("");
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="refno"
        >
          Reference Number
        </label>
        <input
          className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="refno"
          type="text"
          placeholder="Enter your Reference Number"
          value={refno}
          onChange={(e) => setRefno(e.target.value)}
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
