import { Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import PhysicalPage from '../pages/PhysicalPage';
import MentalPage from '../pages/MentalPage';
import SocialPage from '../pages/SocialPage';
import Profile from '../pages/Profile';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import LoginPage from '../pages/LoginPage';
import Mentor from '../components/Mentor';
import ReviewMarque from '../components/ReviewMarquee';
import TodaysTasks from '../components/TodaysTasks';
import About from '../pages/About'

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<WelcomePage />} />
      <Route path="/physical" element={<PhysicalPage />} />
      <Route path="/mental" element={<MentalPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/mentor" element={<Mentor />} />
      <Route path="/review-marque" element={<ReviewMarque />} />
      <Route path="/todays-tasks" element={<TodaysTasks />} />
      <Route path="/About" element={<About />} />
    </Routes>
  );
}

export default AppRoutes;
