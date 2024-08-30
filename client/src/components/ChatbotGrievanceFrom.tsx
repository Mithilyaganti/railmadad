import React, { FormEvent, useState } from "react";
import { GrievanceTypes } from "../pages/GrievanceForm";
import { useTranslation } from "react-i18next";

interface ChatbotGrievanceFormProps {
  onSubmit: (formData: any) => void;
}

const ChatbotGrievanceForm: React.FC<ChatbotGrievanceFormProps> = ({
  onSubmit,
}) => {
  const {t} = useTranslation();
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        placeholder={t("name")}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder={t("phoneNumber")}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="pnr"
        value={formData.pnr}
        onChange={handleChange}
        placeholder={t("pnr")}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t("email")}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="station"
        value={formData.station}
        onChange={handleChange}
        placeholder={t("station")}
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="grievancetype"
        value={formData.grievancetype}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">{t('selectGrievanceType')}</option>
        <option value="delay">{t('delay')}</option>
        <option value="cancellation">{t('cancellation')}</option>
        <option value="refund">{t('refund')}</option>
        <option value="injury">{t('injury')}</option>
        <option value="cleanliness">{t('cleanliness')}</option>
        <option value="food">{t('food')}</option>
        <option value="staff">{t('staff')}</option>
        <option value="security">{t('security')}</option>
        <option value="other">{t('other')}</option>
      </select>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder={t("description")}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        {t('submitGrievance')}
      </button>
    </form>
  );
};

export default ChatbotGrievanceForm;
