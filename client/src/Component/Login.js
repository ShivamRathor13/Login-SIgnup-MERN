import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showRequiredMessage, setShowRequiredMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    setErrorMessage("");
  };

  const login = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      setShowRequiredMessage(true);
      return;
    }

    setErrorMessage("");

    axios
      .post("http://localhost:3002/api/auth/login", user)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          setLoginUser(res.data.user);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response) {
          if (error.response.status === 401) {
            setErrorMessage("Login failed: " + error.response.data.message);
          } else if (error.response.status === 404) {
            setErrorMessage(
              "User not registered: " + error.response.data.message
            );
          } else {
            setErrorMessage("An error occurred while logging in.");
          }
        } else {
          setErrorMessage("Network error occurred while logging in.");
        }
      });
  };

  return (
    <div className="containerstyle">
      <form className="formstyle">
        <button className="Signup">
          <a href="/signup">SIGN IN</a>
        </button>
        <span className="my-custom-class">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            fill="#868CA5"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </span>

        <input
          type="email"
          name="email"
          className="inputfield"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="password"
          name="password"
          className="inputfield"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        {showRequiredMessage && (
          <p style={{ color: "red", marginTop: "-20px" }}>
            Email and password are required.
          </p>
        )}
        {errorMessage && (
          <p style={{ color: "red", marginTop: "-20px" }}>{errorMessage}</p>
        )}
        <button type="button" onClick={login} className="loginbutton">
          <span> LOGIN</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
