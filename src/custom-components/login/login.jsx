import React, { useState, useEffect } from "react";
import ErrorMessage from "../errormessage";

const Login = ({ message, onLogin }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const clearMessage = () => setErrorMessage("");

  useEffect(() => {
    message && setErrorMessage("Wrong credentials");
  }, [message]);

  const handleInputChange = e =>
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });

  const handleSubmit = e => {
    e.preventDefault();
    onLogin({ username: formValues.username, password: formValues.password });
  };

  const handleClickRegister = () => {
    setFormValues({ username: "", password: "" });
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 38 }));
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          value={formValues.username}
          type="text"
          name="username"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Username"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={formValues.password}
          type="password"
          name="password"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Password"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <button
        onClick={handleClickRegister}
        type="button"
        className="btn btn-primary"
      >
        Register
      </button>
      <ErrorMessage message={errorMessage} clearMessage={clearMessage} />
    </form>
  );
};

export default Login;
