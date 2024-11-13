
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import WelcomePage from '../pages/WelcomePage';
import PhysicalPage from '../pages/PhysicalPage';
import MentalPage from '../pages/MentalPage';
import SocialPage from '../pages/SocialPage';
import Profile from '../pages/Profile';
import LoginPage from '../pages/LoginPage';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<WelcomePage />} />
      <Route path="/physical" element={<PhysicalPage />} />
      <Route path="/mental" element={<MentalPage />} />
      <Route path="/social" element={<SocialPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/profile" element={<Profile />} />
    </Routes>
  );
}

export default AppRoutes;
