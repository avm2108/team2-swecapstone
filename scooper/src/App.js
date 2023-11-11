import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Home from './Components/Home.js';
import Login from './Components/Login.js';
import RegisterSchool from './Components/RegisterSchool.js';
import Dashboard from './Components/Dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegisterSchool" element={<RegisterSchool />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
