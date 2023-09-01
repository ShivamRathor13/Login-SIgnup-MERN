import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (
      user.name === "" ||
      user.dob === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      setErrorMessage("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:3002/api/auth/signup", user)
      .then((res) => {
        if (res.status === 201) {
          setErrorMessage("");
          alert(res.data.message);
          navigate("/Login");
        }
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMessage(
              "User already registered: " + error.response.data.message
            );
          } else {
            setErrorMessage("An error occurred while registering.");
          }
        } else {
          setErrorMessage("Network error occurred while registering.");
        }
      });
  };

  return (
    <div className="containerstyle">
      <form className="formstyle2">
        <h2>Register</h2>
        {/* {console.log("User", user)} */}
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="inputfield"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <br />
        <div className="field">
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="inputfield"
            value={user.dob}
            onChange={handleChange}
            required
            style={{
              border: "none",
              padding: "8px 45px",
              fontSize: "16px",
            }}
          />
        </div>
        <br />
        <br />
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your Email"
            className="inputfield"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <br />
        <div className="field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="inputfield"
            placeholder="Enter a password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <br />
        <p style={{ color: "red", marginTop: "-40px" }}>{errorMessage}</p>{" "}
        <button className="loginbutton" onClick={register}>
          <span>Register</span>
        </button>
        <div>
          <a href="/Login" style={{ color: "#ffffffa5" }}>
            Already a user please login
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
