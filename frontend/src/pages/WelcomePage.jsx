import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// import image1 from '../assets/images/image1.jpg';
// import image2 from '../assets/images/image2.jpg';
// import image3 from '../assets/images/image3.jpg';
import './WelcomePage.css';
import TodaysTasks from '../components/TodaysTasks';
import Chart from '../components/Chart'
import HotStreak from '../components/HotStreak';
import Quote from '../components/Quote';
// import Mentor from '../components/Mentor';
import Footer from '../components/Footer';


function WelcomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // För trigger

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTaskComplete = () => {
    // Ökar trigger varje gång en uppgift slutförs
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


          {/* <motion.div
            className="text-content"
            variants={textAppear}
            initial="hidden"
            animate="visible"
          >
            <p>
              <strong>Welcome!</strong>
              <br />
              Here are your daily tasks designed to uplift your physical health, strengthen your social bonds, and fuel your personal growth. Every day is an opportunity to become a better you.
            </p>
          </motion.div> */}
    <div className="allContentContainer">
      <div className="dailyQuoteContainer">
        <Quote />
      </div>
      <div className="trinity-container">
        <div className="hotStreakContainer">
          <HotStreak token={token} triggerUpdate={updateTrigger}/>
        </div>
        <div className="dailyActivityContainer">
          <TodaysTasks token={token} onTaskComplete={handleTaskComplete} />
        </div>
        <div className="chartContainer">
          <Chart token={token} triggerUpdate={updateTrigger} />
        </div>
      </div>





      </div>
      <Footer />
    </motion.div>
  );
}

export default WelcomePage;
