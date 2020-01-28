import React, { useState } from "react";
import userService from "../../services/userlogic";
import ErrorMessage from "../errormessage";

const Register = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const clearMessage = () => setErrorMessage("");

  const [formValues, setFormValues] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: ""
  });

  const handleInputChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    try {
      userService
        .registerUser(formValues)
        .then(() => {
          setMessage("User registered correctly!");
          setFormValues({
            name: "",
            surname: "",
            email: "",
            username: "",
            password: ""
          });

          setTimeout(() => {
            setMessage("");
          }, 1500);
        })
        .catch(err => setErrorMessage(err.message));
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleClickLogin = () => {
    setFormValues({
      name: "",
      surname: "",
      email: "",
      username: "",
      password: ""
    });
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));
    document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 40 }));
  };

  return (
    <form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={formValues.name}
          type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          value={formValues.surname}
          type="text"
          className="form-control"
          placeholder="Surname"
          name="surname"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          value={formValues.email}
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          value={formValues.username}
          type="text"
          className="form-control"
          placeholder="Username"
          name="username"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          value={formValues.password}
          type="password"
          className="form-control"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
      <button
        onClick={handleClickLogin}
        type="button"
        className="btn btn-primary"
      >
        Login
      </button>
      {message && <p className="success_message">{message}</p>}
      <ErrorMessage message={errorMessage} clearMessage={clearMessage} />
    </form>
  );
};

export default Register;
