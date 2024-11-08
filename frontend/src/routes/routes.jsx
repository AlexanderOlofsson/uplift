
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import WelcomePage from '../pages/WelcomePage';
import PhysicalPage from '../pages/PhysicalPage';
import MentalPage from '../pages/MentalPage';
import SocialPage from '../pages/SocialPage';
import Login from '../components/Login';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/dashboard" element={<WelcomePage />} />
      <Route path="/physical" element={<PhysicalPage />} />
      <Route path="/mental" element={<MentalPage />} />
      <Route path="/social" element={<SocialPage />} />
    </Routes>
  );
}

export default AppRoutes;
