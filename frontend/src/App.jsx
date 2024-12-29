import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Support from "./Pages/Support";
import AuthPage from "./Pages/AuthPage";
import LogoutHandler from "./services/logoutHandles";
import "./App.css";
import { useState, useEffect } from "react";
import BlackAndWhite from "./Templates/BlackAndWhite/BlackAndWhite";
import MinimalAndModern from "./Templates/MinimalAndModern/MinimalAndModern";
import Sleekfolio from "./Templates/Sleekfolio/sleekfolio";


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
      // Simulate checking authentication status
      useEffect(() => {
          // Replace this with actual authentication check
          const token = localStorage.getItem('token');
          if (token) {
              setIsAuthenticated(true);
          } else {
              setIsAuthenticated(false);
          }
      }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />}/>
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/logout" element={<LogoutHandler/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/template/black-and-white" element={<BlackAndWhite />} />
        <Route path="/template/minimal-and-modern" element={<MinimalAndModern />} />
        <Route path="/template/sleekfolio" element={<Sleekfolio />} />
      </Routes>
    </Router>
  );
}
