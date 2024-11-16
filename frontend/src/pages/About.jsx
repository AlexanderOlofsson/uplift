import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../styles/About.css';
import image2 from '../assets/images/image2.jpg';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
 
    const aboutContainer = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2,
                when: 'beforeChildren',
            },
        },
    };

    const aboutText = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.div
            className="about"
            variants={aboutContainer}
            initial="hidden"
            animate="visible"
        >
            <header className="header">
                <motion.h1 className="symbol" variants={aboutText}>
                    Uplift
                </motion.h1>
            </header>
            <motion.div className="about-content" variants={aboutContainer}>
                <motion.h2 variants={aboutText}>About Us</motion.h2>
                <motion.div variants={aboutText}>
                    <LazyLoadImage 
                        src={image2} 
                        alt="Uplift App" 
                        effect="blur"
                        height={200}
                        width={300}
                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                    />
                </motion.div>
                <motion.p variants={aboutText}>
                    Welcome to Uplift, a motivational web app created to inspire positive habits and daily well-being. Our mission is to help individuals take small but meaningful steps toward a healthier and more fulfilling lifestyle.
                </motion.p>
                <motion.p variants={aboutText}>
                    Every day, users receive three &quot;daily quests&quot; from three key areas: Physical, Social, and Mental well-being. These tasks are simple, achievable actions – like taking a short walk, giving someone a compliment, or practicing mindfulness. Through these daily activities, we aim to promote balance, connection, and self-care.
                </motion.p>
                <motion.p variants={aboutText}>
                    To keep the momentum going, Uplift includes a &quot;hotstreak&quot; feature that rewards consistency. Additionally, an optional mentor function allows loved ones to offer support and encouragement, fostering accountability in a positive way. Users can track their progress, celebrate milestones and see their growth over time.
                </motion.p>
                <motion.button
                    className="return-button"
                    onClick={() => navigate('/dashboard')}
                    variants={aboutText}
                    whileHover={{ scale: 1.1, backgroundColor: '#0056b3' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Return to Dashboard
                </motion.button>
            </motion.div>
            <Footer />
        </motion.div>
    );
};

export default About;
