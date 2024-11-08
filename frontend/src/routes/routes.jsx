
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';  
import WelcomePage from '../pages/WelcomePage';
import PhysicalPage from '../pages/PhysicalPage';
import MentalPage from '../pages/MentalPage';
import SocialPage from '../pages/SocialPage';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/physical" element={<PhysicalPage />} />
      <Route path="/mental" element={<MentalPage />} />
      <Route path="/social" element={<SocialPage />} />
    </Routes>
  );
}

export default AppRoutes;
