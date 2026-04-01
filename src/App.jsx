import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CoursesPage from './pages/CoursesPage';
import ProPage from './pages/ProPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/pro" element={<ProPage />} />
        <Route path="/gift" element={<div style={{color:'#fff',padding:'4rem',textAlign:'center'}}>Gift page coming soon.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
