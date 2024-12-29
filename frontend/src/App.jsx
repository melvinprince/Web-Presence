import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Support from "./Pages/Support";
import AuthPage from "./Pages/AuthPage";
import LogoutHandler from "./services/logoutHandles";
import "./App.css";

import BlackAndWhite from "./Templates/BlackAndWhite/BlackAndWhite";
import MinimalAndModern from "./Templates/MinimalAndModern/MinimalAndModern";
import Sleekfolio from "./Templates/Sleekfolio/sleekfolio";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
