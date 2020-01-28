import React, { useState, useEffect } from "react";

const ErrorMessage = ({ message, clearMessage }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(message);
    if (errorMessage === "" && message) {
      setErrorMessage(
        message === "Failed to fetch"
          ? "Oups, iTunes is having some problems. Try another or wait a bit"
          : message
      );
      setTimeout(() => {
        setErrorMessage("");
        clearMessage();
      }, 1500);
    }
  }, [message]);

  return errorMessage && <p className="error_message">{errorMessage}</p>;
};

export default ErrorMessage;
