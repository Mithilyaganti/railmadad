import React, { useState } from "react";
import ChatInit from "../components/ChatInit";
import ChatbotGrievanceForm from "../components/ChatbotGrievanceFrom";
import TicketBookingForm from "../components/TicketBookingForm";
import apiClient from "../config/axios";
import { GrievanceTypes } from "./GrievanceForm";
import { useTranslation } from "react-i18next";

export interface ChatMessageTypes {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageTypes[]>([]);
  const [input, setInput] = useState("");
  const [showGrievanceForm, setShowGrievanceForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      try {
        const response = await apiClient.post("/chatbot", { message: input });
        if (response.data.success) {
          setMessages((prev) => [
            ...prev,
            { text: response.data.response, isUser: false },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: "An error occurred. Please try again later.",
              isUser: false,
            },
          ]);
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: "An error occurred. Please try again later.", isUser: false },
        ]);
      }
      setInput("");
    }
  };

  const handleGrievanceSubmit = async (formData: GrievanceTypes) => {
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
      });

      if (response.data.success) {
        setMessages([
          ...messages,
          { text: "Grievance submitted successfully!", isUser: false },
          { text: `Reference Number ${response.data.refno}`, isUser: false },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            text: "Failed to submit grievance. Please try again.",
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      setMessages([
        ...messages,
        { text: "An error occurred. Please try again later.", isUser: false },
      ]);
    }
    setShowGrievanceForm(false);
  };

  const handleTicketBooking = async (formData: any) => {
    setMessages([
      ...messages,
      {
        text: `Ticket booking request received for ${formData.from} to ${formData.to}`,
        isUser: false,
      },
    ]);
    try {
      const response = await apiClient.post("/book-ticket", formData);
      if (response.data.success) {
        setMessages([
          ...messages,
          {
            text: "Ticket Booking Request submitted successfully!",
            isUser: false,
          },
          { text: `Reference Number ${response.data.refno}`, isUser: false },
        ]);
      } else {
        setMessages([
          ...messages,
          {
            text: `Failed to book ticket. Please try again later.`,
            isUser: false,
          },
        ]);
      }
    } catch (error) {
      setMessages([
        ...messages,
        {
          text: `Failed to book ticket. Please try again later.`,
          isUser: false,
        },
      ]);
    }
    setShowTicketForm(false);
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-md rounded relative">
      {messages.length === 0 ? (
        <ChatInit
          setMessages={setMessages}
          setShowGrievanceForm={setShowGrievanceForm}
          setShowTicketForm={setShowTicketForm}
        />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 mb-20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded ${
                message.isUser ? "bg-blue-100 ml-auto" : "bg-gray-100"
              }`}
            >
              {message.text}
            </div>
          ))}
          {showGrievanceForm && messages.length == 1 && (
            <ChatbotGrievanceForm onSubmit={handleGrievanceSubmit} />
          )}
          {showTicketForm && messages.length == 1 && (
            <TicketBookingForm onSubmit={handleTicketBooking} />
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border-t p-4 flex absolute bottom-0 right-0 left-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-l px-4 py-2"
          placeholder={t("typeYourMessage")}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          {t("send")}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
