import React, { useState, useEffect } from "react";

const Message = ({ message, clearMessage, success }) => {
  const [showingMessage, setShowingMessage] = useState("");

  useEffect(() => {
    if (showingMessage === "" && message) {
      setShowingMessage(
        message === "Failed to fetch"
          ? "Oups, iTunes is having some problems. Try another or wait a bit"
          : message
      );
      setTimeout(() => {
        setShowingMessage("");
        clearMessage();
      }, 1500);
    }
  }, [message]);

  return (
    showingMessage && (
      <p className={success ? "success_message" : "error_message"}>
        {showingMessage}
      </p>
    )
  );
};

export default Message;
