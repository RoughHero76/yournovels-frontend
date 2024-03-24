import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login.jsx';
import SignUp from './components/signup/signup.jsx';
import Dashboard from './components/dashboard/dashboard.jsx';
import SignUpDetails from './components/signup/signupdetails.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupdetails" element={<SignUpDetails />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
