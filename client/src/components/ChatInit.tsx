import React from "react";
import { ChatMessageTypes } from "../pages/ChatBot";
import { useTranslation } from "react-i18next";

interface ChatInitTypes {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageTypes[]>>;
  setShowGrievanceForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTicketForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInit: React.FC<ChatInitTypes> = ({
  setMessages,
  setShowGrievanceForm,
  setShowTicketForm,
}) => {
  const { t } = useTranslation();
  const addMessage = (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    if (message === "Raise Grievance") {
      setShowGrievanceForm(true);
    } else if (message === "Book Ticket") {
      setShowTicketForm(true);
    }
  };

  return (
    <div className="w-full mx-auto my-auto px-10 flex flex-row justify-center items-center gap-24">
      <div
        className="flex-1 h-48 text-center bg-gray-400 shadow-lg rounded-lg cursor-pointer flex items-center justify-center"
        onClick={() => addMessage("Raise Grievance")}
      >
        {t('raiseGrievance')}
      </div>
      <div
        className="flex-1 h-48 text-center bg-gray-400 shadow-lg rounded-lg cursor-pointer flex items-center justify-center"
        onClick={() => addMessage("Book Ticket")}
      >
        {t('bookTicket')}
      </div>
    </div>
  );
};

export default ChatInit;
