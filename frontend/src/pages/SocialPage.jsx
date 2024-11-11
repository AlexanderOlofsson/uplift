import { motion } from 'framer-motion';
import '../styles/page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import image2 from '../assets/images/image2.jpg';
import { useNavigate } from 'react-router-dom';

function SocialPage() {
const navigate = useNavigate()

const TextAppear = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const logoEffect = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const imageHoverEffect = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.4, ease: 'easeOut' } },
  };

  const textHoverEffect = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={TextAppear}
    >
      <header>
        <motion.div variants={logoEffect}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" onClick={() => navigate('/dashboard')} />
        </motion.div>
        <motion.h1 className="logo" variants={logoEffect}>
          Uplift
        </motion.h1>
      </header>

      <main>
        <motion.img
          src={image2}
          alt="Mental Task"
          className="center-image"
          variants={imageHoverEffect}
        />
        
        <motion.h2 className="task-title" variants={textHoverEffect}>
        Today&apos;s Social Task
        </motion.h2>

        
        <motion.div className="reminder-text" variants={textHoverEffect}>
          <p>Don&apos;t forget to complete your daily task before midnight!</p>
        </motion.div>
        
        <motion.div className="task-container" variants={textHoverEffect}>
          {/*Vi har en tom container tills datan från vår Postgres är färdig */}
        </motion.div>
      </main>

      <footer>
        <motion.h2 className="logo" variants={logoEffect}>
          Uplift
        </motion.h2>
        <motion.p variants={textHoverEffect}>&copy; 2024 Uplift. All rights reserved.</motion.p>
      </footer>
    </motion.div>
  )
}

export default SocialPage;