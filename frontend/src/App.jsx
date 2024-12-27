import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import DetailsEntry from './Pages/DetailsEntry';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';
import './App.css';
import AuthPage from './Pages/AuthPage';
import Template from './Templates/Modern and Minimal Template/template';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/details-entry" element={<DetailsEntry />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/support" element={<Support />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </Router>
  )
}