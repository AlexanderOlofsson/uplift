import Lottie from "lottie-react";
import logoAnimation from '../assets/lottieFiles/firstAnimation.json';
import ladderAnimationLoop from '../assets/lottieFiles/secondSectionLadder.json';
import researchAnimationLoop from '../assets/lottieFiles/thirdSectionResearch.json';
import cellPhoneAnimationLoop from '../assets/lottieFiles/fourthSectionCellphone.json';
// https://www.react-fast-marquee.com/documentation
import ReviewSlider from "react-fast-marquee"
import '../styles/Home.css';

//Profile picture for the reviews
import profile1 from '../assets/profilePictures/1.jpg';
import profile2 from '../assets/profilePictures/2.jpg';
import profile3 from '../assets/profilePictures/3.jpg';
import profile4 from '../assets/profilePictures/4.jpg';
import profile5 from '../assets/profilePictures/5.jpg';
import profile6 from '../assets/profilePictures/6.jpg';
import profile7 from '../assets/profilePictures/7.jpg';
import Marquee from "react-fast-marquee";

function Header() {


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
                <button className="signupBtn">Get started</button>
                <button className="loginBtn">I already have an account</button>
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
  <section className="marquee">
  <ReviewSlider direction="left" speed={25} pauseOnHover={true} gradient={false} autoFill={true}>

    <div className="review">
      <p className="reviewDescription">
        &quot;This app helped me stay motivated every day. Highly recommended!&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile1} alt="Gary's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Gary</h2>
          <p className="profileJobCountry">Software Engineer</p>
          <p className="profileJobCountry">United States</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;I’ve seen a real improvement in my daily habits since I started using Uplift.&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile2} alt="Sabrina's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Sabrina</h2>
          <p className="profileJobCountry">Marketing Specialist</p>
          <p className="profileJobCountry">Canada</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;The small steps approach really works! It’s been a game-changer for me.&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile3} alt="Misty's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Misty</h2>
          <p className="profileJobCountry">Project Manager</p>
          <p className="profileJobCountry">United Kingdom</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;The app is incredibly useful for staying focused on positive goals. Every day feels a little lighter!&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile4} alt="Serena's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Serena</h2>
          <p className="profileJobCountry">Graphic Designer</p>
          <p className="profileJobCountry">Australia</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;I never thought small tasks could make such a big difference. Thank you, Uplift, for making it possible!&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile5} alt="Cynthia's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Cynthia</h2>
          <p className="profileJobCountry">Content Writer</p>
          <p className="profileJobCountry">South Africa</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;I love the layout of the app! It makes it easy to take small steps toward feeling better, and I feel motivated every day.&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile6} alt="Giovanni's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Giovanni</h2>
          <p className="profileJobCountry">Product Manager</p>
          <p className="profileJobCountry">Italy</p>
        </div>
      </div>
    </div>

    <div className="review">
      <p className="reviewDescription">
        &quot;Uplift has given me small but powerful reminders that truly make a difference in my day-to-day life. A must-have for everyone!&quot;
      </p>
      <div className="reviewNameContainer">
        <img className="profilePicture" src={profile7} alt="Blaine's profile" />
        <div className="profileInfoContainer">
          <h2 className="reviewName">Blaine</h2>
          <p className="profileJobCountry">Data Analyst</p>
          <p className="profileJobCountry">New Zealand</p>
        </div>
      </div>
    </div>

  </ReviewSlider>
</section>


    </div>

    );
}

export default Header;
