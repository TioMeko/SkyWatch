import React from "react";
// import Footer from './components/Footer';
// import Header from './components/Header';
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
      <Router>
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/weather" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="*"
              element={<h1 className="display-2">Wrong page!</h1>}
            />
          </Routes>
          {/* <Footer /> */}
      </Router>
  );
};
