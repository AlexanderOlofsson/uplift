// https://www.npmjs.com/package/react-router-dom
import { useNavigate } from 'react-router-dom';
//https://www.npmjs.com/package/lottie-react
import Lottie from "lottie-react";
// https://www.npmjs.com/package/react-countup
import CountUp from 'react-countup';
// https://www.npmjs.com/package/react-intersection-observer
import { useInView } from 'react-intersection-observer'

// Lottie animations
import logoAnimation from '../assets/lottieFiles/firstAnimation.json';
import ladderAnimationLoop from '../assets/lottieFiles/secondSectionLadder.json';
import researchAnimationLoop from '../assets/lottieFiles/thirdSectionResearch.json';
import cellPhoneAnimationLoop from '../assets/lottieFiles/fourthSectionCellphone.json';

// styles
import '../styles/Home.css';

// components
import ReviewMarquee from '../components/ReviewMarquee';
import Footer from '../components/Footer'


function Home() {

  const navigate = useNavigate();

  // react-intersection const
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.75,
  });


    return (
      <div>
  {/* First Section */}
        <section className="containerSection">
            <div className="firstSectionAnimation">
                <Lottie
                    animationData={logoAnimation}
                    style={{ height: '600px', width: '700px' }}
                    autoplay
                    loop={false}
                />
            </div>
            <div className="firstSectionText">
                <h2>Get motivated to take small steps toward a stronger everyday life!</h2>
                <button
                  className="signupBtn"
                  onClick={() => navigate('/login', { state: { showRegister: true } })}>
                  Get started
                </button>
                <button className="loginBtn" onClick={() => navigate('/login')}>I already have an account</button>
            </div>
        </section>

  {/* Second Section */}
      <section className="containerSection">
        <div className="secondSectionText">
            <h2>Small Steps. Big Impact.</h2>
              <p>
                Feeling better starts with taking one step at a time. Uplift makes it easier to begin with small tasks like going outside, saying hello to someone, or taking a break outdoors. Small steps can lead to big progress.
              </p>
        </div>
        <div className="secondSectionAnimation">
            <Lottie
                animationData={ladderAnimationLoop}
                style={{ height: '530px', width: '530px' }}
                autoplay
                loop={true}
            />
        </div>
    </section>

  {/* Second Section Part 2 */}
        <section className="containerSection">
        <div className="secondSectionAnimation">
            <Lottie
                animationData={researchAnimationLoop}
                style={{ height: '530px', width: '530px' }}
                autoplay
                loop={true}
            />
        </div>
        <div className="secondSectionText">
            <h2>Science-Based Motivation</h2>
              <p>
                Uplift is inspired by research-backed strategies in mental health and motivation. Through achievable, small actions, the app helps you gradually improve your well-being, one step at a time.
              </p>
        </div>
    </section>

    {/* Second Section Part 3 */}
                  <section className="containerSection">
        <div className="secondSectionText">
            <h2>Stay Motivated with Us</h2>
              <p>
              With daily reminders and encouraging challenges, it’s easier to stay focused. Uplift nudges you towards simple but meaningful actions that bring balance and energy to your everyday life.
              </p>
        </div>
        <div className="secondSectionAnimation">
            <Lottie
                animationData={cellPhoneAnimationLoop}
                style={{ height: '430px', width: '530px' }}
                autoplay
                loop={true}
            />
        </div>
    </section>

  {/* Second Section Part 3 */}
  <ReviewMarquee/>
  <h1 ref={ref} className={`countUsers ${inView ? 'fade-in' : ''}`}>
     <CountUp start={0} end={7000000} duration={10} prefix="Join Our Community of " suffix="+ Satisfied Users"/>
    </h1>
  <ReviewMarquee direction="right"/>
  {/* Footer */}

<Footer/>
    </div>

    );
}

export default Home;
