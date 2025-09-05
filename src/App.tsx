import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import MiriCPage from './pages/MiriCPage';
import TouristSpotsPage from './pages/TouristSpotsPage';
import WaterQualityMapPage from './pages/WaterQualityMapPage';
import Navigation from './components/Navigation'; // Navigation 컴포넌트 import
import './App.css';

function App() {
  return (
    <Router>
      <Navigation /> {/* 내비게이션 바를 여기에 배치하여 모든 페이지에 고정 */}
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/miri-c" element={<MiriCPage />} />
        <Route path="/tourist-spots" element={<TouristSpotsPage />} />
        <Route path="/water-quality-map" element={<WaterQualityMapPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
