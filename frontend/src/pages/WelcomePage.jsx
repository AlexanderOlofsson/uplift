import { useState } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/images/image1.jpg';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import './WelcomePage.css';

function WelcomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const textAppear = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const linkEffect = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  const imageHoverEffect = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const textHoverEffect = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="container"
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
            <motion.a href="#" className="nav-link" variants={linkEffect}>
              Your Progress
            </motion.a>
            <motion.a href="/dashboard/profile" className="nav-link" variants={linkEffect}>
              Profile
            </motion.a>
            <motion.a href="#" className="nav-link" variants={linkEffect}>
              Log Out
            </motion.a>
          </div>
        </nav>
      </header>

      <main>
        <div className="content">
          <motion.div
            className="text-content"
            variants={textAppear}
            initial="hidden"
            animate="visible"
          >
            <p>
              <strong>Welcome!</strong><br />
              Here are your daily tasks designed to uplift your physical health, strengthen your social bonds, and fuel your personal growth. Every day is an opportunity to become a better you.
            </p>
          </motion.div>
          <div className="image-gallery">
            <motion.div
              className="image-wrapper"
              variants={imageHoverEffect}
              whileHover="hover"
            >
             < a href="physical" className="image-link">
              <img
                src={image3}
                alt="Physical"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <motion.p className="image-caption" variants={textHoverEffect}>
                Physical
              </motion.p>
              </a>
            </motion.div>

            <motion.div
              className="image-wrapper"
              variants={imageHoverEffect}
              whileHover="hover"
            >
                < a href="/social" className="image-link">
              <img
                src={image2}
                alt="Social"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <motion.p className="image-caption" variants={textHoverEffect}>
                Social
              </motion.p>
              </a>
            </motion.div>

            <motion.div
              className="image-wrapper"
              variants={imageHoverEffect}
              whileHover="hover"
            >
                <a href="/mental" className="image-link">
              <img
                src={image1}
                alt="Mental"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <motion.p className="image-caption" variants={textHoverEffect}>
                Mental
              </motion.p>
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      <footer>
        <motion.h2 className="logo" variants={textAppear}>
          Uplift
        </motion.h2>
        <p>&copy; 2024 Uplift. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

export default WelcomePage;
