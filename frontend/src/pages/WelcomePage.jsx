
import { motion } from 'framer-motion';
import './WelcomePage.css';

const WelcomePage = () => {
    
    const textAppear = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 3, ease: 'easeOut' } }
    };

    const hoverEffect = { scale: 1.1, transition: { duration: 0.3, ease: 'easeInOut' } };

    return (
        <div className="wrapper">
            <motion.div 
                className="site-logo" 
                initial="hidden" 
                animate="visible" 
                variants={textAppear}
            >
                Uplift
            </motion.div>

            <motion.div 
                className="navbar" 
                initial="hidden" 
                animate="visible" 
                variants={textAppear} 
                transition={{ delay: 0.2 }}
            >
                <div className="site-menu">
                    <motion.div className="menu-item" whileHover={hoverEffect}>
                        <a href="#">Profile</a>
                    </motion.div>
                    <motion.div className="menu-item" whileHover={hoverEffect}>
                        <a href="#">Log Out</a>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div 
                className="header" 
                initial="hidden" 
                animate="visible" 
                variants={textAppear} 
                transition={{ delay: 0.4 }}
            >
                <div className="header-left">Welcome</div>
                <div className="header-right"><a href="#">Your Progress</a></div>
            </motion.div>

            <div className="container">
                <div className="container-items">
                    <div className="container-img-wrap">
                        <div className="container-img"></div>
                    </div>
                    <motion.div className="item" whileHover={hoverEffect}>
                        <a href="#" className="container-item">
                            <motion.h3 className="physical" whileHover={hoverEffect}>
                                Physical
                            </motion.h3>
                        </a>
                    </motion.div>
                    <motion.div className="item" whileHover={hoverEffect}>
                        <a href="#" className="container-item">
                            <motion.h3 className="social" whileHover={hoverEffect}>
                                Social
                            </motion.h3>
                        </a>
                    </motion.div>
                    <motion.div className="item" whileHover={hoverEffect}>
                        <a href="#" className="container-item">
                            <motion.h3 className="mental" whileHover={hoverEffect}>
                                Mental
                            </motion.h3>
                        </a>
                    </motion.div>
                </div>
            </div>

            <hr className="footer-separator" />
            <footer>
                <div className="footer-content">
                    <motion.p className="footer-logo" initial="hidden" animate="visible" variants={textAppear}>
                        Uplift
                    </motion.p>
                    <motion.p initial="hidden" animate="visible" variants={textAppear} transition={{ delay: 0.6 }}>
                        &copy; All Rights Reserved
                    </motion.p>
                </div>
            </footer>
        </div>
    )
}

export default WelcomePage;
