"use client"
import React from "react";
import ReactDOM from "react-dom";
import SignUp from "./sign_up";
import ForgotPass from "./forgot_password"
import ResetPass from "./reset_password"
import ForgotUser from "./forgot_username"
import ResetUser from "./reset_username"


import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>Have some content</div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>

        <Link to="/signup">SignUp</Link>

        <Link to="/forgotpass">ForgotPass</Link>

        <Link to="/resetpass">ResetPass</Link>

        <Link to="/forgotuser">ForgotUser</Link>

        <Link to="/resetuser">ResetUser</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/forgotpass" element={<ForgotPass />}/>
        <Route path="/resetpass" element={<ResetPass />}/>
        <Route path="/forgotuser" element={<ForgotUser />}/>
        <Route path="/resetuser" element={<ResetUser />}/>
      </Routes>
    </BrowserRouter>
  )
  }

  export default App