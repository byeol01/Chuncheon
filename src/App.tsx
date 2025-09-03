import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import WaterQualityIndexDetailPage from './pages/WaterQualityIndexDetailPage';
import WaterQualityParametersPage from './pages/WaterQualityParametersPage';
import PastWaterPage from './pages/PastWaterPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/water-quality-index" element={<WaterQualityIndexDetailPage />} />
        <Route path="/parameters" element={<WaterQualityParametersPage />} />
        <Route path="/past-water" element={<PastWaterPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
