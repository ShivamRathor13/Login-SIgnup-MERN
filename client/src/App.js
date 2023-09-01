import Signup from "./Component/Signup";
import Login from "./Component/Login";
import "./App.css";
import Homepage from "./Component/Homepage";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            user && user._id ? (
              <Homepage setLoginUser={setLoginUser} />
            ) : (
              <Login setLoginUser={setLoginUser} />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Homepage /> : <Login setLoginUser={setLoginUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Homepage /> : <Signup setLoginUser={setLoginUser} />}
        />
      </Routes>
      {/* <Login />
      <Homepage /> */}
    </div>
  );
}

export default App;
