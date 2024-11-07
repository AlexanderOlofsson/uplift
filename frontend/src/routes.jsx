import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './components/Login';
import Welcome from './pages/WelcomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Welcome />} />
    </Routes>
  );
};

export default AppRoutes;
