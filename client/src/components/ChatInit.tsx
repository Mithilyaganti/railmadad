import React from "react";
import { ChatMessageTypes } from "../pages/ChatBot";

interface ChatInitTypes {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageTypes[]>>;
  setShowGrievanceForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTicketForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInit: React.FC<ChatInitTypes> = ({ setMessages, setShowGrievanceForm, setShowTicketForm }) => {
  const addMessage = (message: string) => {
    setMessages((prev) => [
      ...prev,
      { text: message, isUser: true },
      { text: `You selected: ${message}`, isUser: false },
    ]);
    if (message === "Raise Grievance") {
      setShowGrievanceForm(true);
    } else if (message === "Book Ticket") {
      setShowTicketForm(true);
    }
  };

  return (
    <div className="w-3/4 mx-auto flex flex-row justify-center items-center gap-10">
      <div
        className="flex-1 text-center bg-gray-100 shadow-md py-12 cursor-pointer"
        onClick={() => addMessage("Raise Grievance")}
      >
        Raise Grievance
      </div>
      <div
        className="flex-1 text-center bg-gray-100 shadow-md py-12 cursor-pointer"
        onClick={() => addMessage("Book Ticket")}
      >
        Book Ticket
      </div>
    </div>
  );
};

export default ChatInit;