import React, { useState } from "react";

interface ChatbotGrievanceFormProps {
  onSubmit: (formData: any) => void;
}

const ChatbotGrievanceForm: React.FC<ChatbotGrievanceFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    pnr: "",
    email: "",
    station: "",
    grievanceType: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-10 max-w-3xl mx-auto">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="pnr"
        value={formData.pnr}
        onChange={handleChange}
        placeholder="PNR"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="station"
        value={formData.station}
        onChange={handleChange}
        placeholder="Station Name"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="grievanceType"
        value={formData.grievanceType}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Grievance Type</option>
        <option value="delay">Delay</option>
        <option value="cancellation">Cancellation</option>
        <option value="refund">Refund</option>
        <option value="sanitation">Sanitation</option>
        <option value="Injury">Injury</option>
        <option value="food">Food</option>
        <option value="staff">Staff</option>
        <option value="security">Security</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Submit Grievance
      </button>
    </form>
  );
};

export default ChatbotGrievanceForm;
