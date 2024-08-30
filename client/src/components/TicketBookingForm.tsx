import React, { useState } from 'react';

interface TicketBookingFormProps {
  onSubmit: (formData: any) => void;
}

const TicketBookingForm: React.FC<TicketBookingFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '',
    class: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        name="from"
        value={formData.from}
        onChange={handleChange}
        placeholder="From"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="to"
        value={formData.to}
        onChange={handleChange}
        placeholder="To"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="passengers"
        value={formData.passengers}
        onChange={handleChange}
        placeholder="Number of Passengers"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="class"
        value={formData.class}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Class</option>
        <option value="economy">Economy</option>
        <option value="business">Business</option>
        <option value="first">First Class</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Book Ticket
      </button>
    </form>
  );
};

export default TicketBookingForm;