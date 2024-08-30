import React, { useState, ChangeEvent, FormEvent } from "react";
import apiClient from "../config/axios";

export interface GrievanceTypes {
  name: string;
  phone: string;
  email: string;
  pnr: string;
  station: string;
  grievancetype: string;
  description: string;
  image: File | null;
}

const RailMadadGrievanceForm: React.FC = () => {
  const [formData, setFormData] = useState<GrievanceTypes>({
    name: "",
    phone: "",
    email: "",
    pnr: "",
    station: "",
    grievancetype: "",
    description: "",
    image: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formPayload.append(key, value);
      }
    });
    try {
      const response = await apiClient.post("/raise-grievance", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting grievance:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 min-h-screen text-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#ff9999] mb-4 border-b-2 border-[#ff9999] pb-2">Raise Grievance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-blue-400">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400 text-sm"
            />
          </div>
          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-green-400">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-purple-400">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400 text-sm"
            />
          </div>
          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-yellow-400">
            <label
              htmlFor="pnr"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              PNR Number
            </label>
            <input
              type="text"
              id="pnr"
              name="pnr"
              value={formData.pnr}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-yellow-400">
            <label
              htmlFor="station"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Station
            </label>
            <input
              type="text"
              id="station"
              name="station"
              value={formData.station}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400 text-sm"
            />
          </div>

          <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-red-400">
            <label
              htmlFor="grievancetype"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Grievance Type
            </label>
            <select
              id="grievancetype"
              name="grievancetype"
              value={formData.grievancetype}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white focus:border-red-400 focus:ring-red-400 text-sm"
            >
              <option value="">Select a grievance type</option>
              <option value="delay">Train Delay</option>
              <option value="cancellation">Cancellation</option>
              <option value="refund">Refund</option>
              <option value="injury">injury</option>
              <option value="cleanliness">Cleanliness Issue</option>
              <option value="food">Food Quality</option>
              <option value="staff">Staff Behavior</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-pink-400">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-400 file:text-gray-900
              hover:file:bg-pink-500
              file:cursor-pointer"
          />
        </div>
        <div className="bg-gray-700 p-3 rounded-lg shadow-md border-l-4 border-indigo-400">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
            className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-indigo-400 focus:ring-indigo-400 text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#ff9999] text-gray-900 font-semibold rounded-md hover:bg-[#ffb3b3] focus:outline-none focus:ring-2 focus:ring-[#ff9999] focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-sm"
          >
            Submit Grievance
          </button>
        </div>
      </form>
    </div>
  );
};

export default RailMadadGrievanceForm;