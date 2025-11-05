import React from 'react'
import Home from './frontend/pages/Home/Home'
import DrinksPage from './frontend/pages/DrinksPage/DrinksPage';
import RegistrationPage from './frontend/pages/RegistrationPage/RegistrationPage';
import AdminPage from './frontend/pages/AdminPage/AdminPage';
import LoginPage from './frontend/pages/LoginPage/LoginPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminPage />} />

      </Routes>
    </Router>
    </>
  )
}

export default App;
