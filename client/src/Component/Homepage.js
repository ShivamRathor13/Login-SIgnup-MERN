import React from "react";
import "../App.css";

const Homepage = ({ setLoginUser }) => {
  const data = [
    { name: "John", age: 30, email: "john@example.com" },
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 35, email: "bob@example.com" },
    { name: "Eve", age: 28, email: "eve@example.com" },
    { name: "Jane", age: 32, email: "jane@example.com" },
    { name: "Mark", age: 40, email: "mark@example.com" },
  ];

  return (
    <div className="homepage-container">
      <h2>Welcome to the Homepage</h2>
      <button className="loginbutton" onClick={() => setLoginUser({})}>
        Logout
      </button>

      <h3>User Table</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
