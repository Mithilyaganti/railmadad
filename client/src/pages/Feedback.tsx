import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    console.log("Feedback submitted:", { rating, comment });
    setRating(null);
    setComment("");
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {t("rateYourExperience")}
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`text-3xl ${
                rating && rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="comment"
        >
          {t("submitFeedback")}
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="comment"
          placeholder={t("yourFeedback")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          {t("submitFeedback")}
        </button>
      </div>
    </div>
  );
};

export default Feedback;
