import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface TicketBookingFormProps {
  onSubmit: (formData: any) => void;
}

const TicketBookingForm: React.FC<TicketBookingFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "",
    class: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        name="from"
        value={formData.from}
        onChange={handleChange}
        placeholder={t("from")} 
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="to"
        value={formData.to}
        onChange={handleChange}
        placeholder={t("to")}
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
        placeholder={t("passengers")}
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
        <option value="">{t('class')}</option>
        <option value="economy">{t('economy')}</option>
        <option value="business">{t('business')}</option>
        <option value="first">{t('firstClass')}</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {t("bookTicket")}
      </button>
    </form>
  );
};

export default TicketBookingForm;
