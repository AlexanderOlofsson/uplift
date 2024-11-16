import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

// Lazy-load komponenter för att minska initiala laddningstiden
const TodaysTasks = lazy(() => import('../components/TodaysTasks'));
const Chart = lazy(() => import('../components/Chart'));
const HotStreak = lazy(() => import('../components/HotStreak'));
const Quote = lazy(() => import('../components/Quote'));
const Footer = lazy(() => import('../components/Footer'));

function WelcomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTaskComplete = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const textAppear = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const linkEffect = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <motion.div
      className="dashboard-container"
      variants={textAppear}
      initial="hidden"
      animate="visible"
    >
      <header>
        <motion.h1 className="logo" variants={textAppear}>
          Uplift
        </motion.h1>
        <nav>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <motion.a href="/dashboard/profile" className="nav-link" variants={linkEffect}>
              Profile
            </motion.a>
            <motion.a href="#" className="nav-link" onClick={handleLogout} variants={linkEffect}>
              Log Out
            </motion.a>
          </div>
        </nav>
      </header>

      <div className="allContentContainer">
      
        <Suspense fallback={<div>Loading...</div>}>
          <div className="dailyQuoteContainer">
            <Quote />
          </div>
        </Suspense>
        <div className="trinity-container">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="hotStreakContainer">
              <HotStreak token={token} triggerUpdate={updateTrigger} />
            </div>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="dailyActivityContainer">
              <TodaysTasks token={token} onTaskComplete={handleTaskComplete} />
            </div>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="chartContainer">
              <Chart token={token} triggerUpdate={updateTrigger} />
            </div>
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </motion.div>
  );
}

export default WelcomePage;
