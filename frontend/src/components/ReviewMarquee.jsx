import '../styles/Home.css';
import PropTypes from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";
// https://www.youtube.com/watch?v=hJ7Rg1821Q0 inspiration
// css pack included (blur, opacity etc).
import "react-lazy-load-image-component/src/effects/blur.css";

// https://www.react-fast-marquee.com/documentation
import ReviewSlider from "react-fast-marquee";

// Profile picture for the reviews (https://thispersondoesnotexist.com/)
import profile1 from '../assets/profilePictures/1.jpg';
import profile2 from '../assets/profilePictures/2.jpg';
import profile3 from '../assets/profilePictures/3.jpg';
import profile4 from '../assets/profilePictures/4.jpg';
import profile5 from '../assets/profilePictures/5.jpg';
import profile6 from '../assets/profilePictures/6.jpg';
import profile7 from '../assets/profilePictures/7.jpg';

function ReviewMarquee(props) {
  const { direction = "left" } = props;

  return (
    <section className="marquee">
      <ReviewSlider speed={35} gradient={true} gradientWidth={200} gradientColor={"#3367a1"} autoFill={true} direction={direction}>

        {/* Review 1 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              This app helped me stay motivated every day. Highly recommended!
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile1}
              alt="Gary's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Gary</h2>
              <p className="profileJobCountry">Software Engineer</p>
              <p className="profileJobCountry">United States</p>
            </div>
          </div>
        </div>

        {/* Review 2 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              I’ve seen a real improvement in my daily habits since I started using Uplift.
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile2}
              alt="Sabrina's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Sabrina</h2>
              <p className="profileJobCountry">Marketing Specialist</p>
              <p className="profileJobCountry">Canada</p>
            </div>
          </div>
        </div>

        {/* Review 3 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              The small steps approach really works! It’s been a game-changer for me.
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile3}
              alt="Misty's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Misty</h2>
              <p className="profileJobCountry">Project Manager</p>
              <p className="profileJobCountry">United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Review 4 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              The app is incredibly useful for staying focused on positive goals. Every day feels a little lighter!
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile4}
              alt="Serena's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Serena</h2>
              <p className="profileJobCountry">Graphic Designer</p>
              <p className="profileJobCountry">Australia</p>
            </div>
          </div>
        </div>

        {/* Review 5 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              I never thought small tasks could make such a big difference. Thank you, Uplift, for making it possible!
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile5}
              alt="Cynthia's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Cynthia</h2>
              <p className="profileJobCountry">Content Writer</p>
              <p className="profileJobCountry">South Africa</p>
            </div>
          </div>
        </div>

        {/* Review 6 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              I love the layout of the app! It makes it easy to take small steps toward feeling better, and I feel motivated every day.
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile6}
              alt="Giovanni's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Giovanni</h2>
              <p className="profileJobCountry">Product Manager</p>
              <p className="profileJobCountry">Italy</p>
            </div>
          </div>
        </div>

        {/* Review 7 */}
        <div className="review">
          <div className="reviewDescriptionContainer">
            <span className="quoteMark">“</span>
            <p className="reviewDescription">
              Uplift has given me small but powerful reminders that truly make a difference in my day-to-day life.
            </p>
            <span className="quoteMark2">”</span>
          </div>

          <div className="reviewNameContainer">
            <LazyLoadImage
              className="profilePicture"
              src={profile7}
              alt="Blaine's profile"
              effect="blur"
            />
            <div className="profileInfoContainer">
              <h2 className="reviewName">Blaine</h2>
              <p className="profileJobCountry">Data Analyst</p>
              <p className="profileJobCountry">New Zealand</p>
            </div>
          </div>
        </div>

      </ReviewSlider>
    </section>
  );
}

ReviewMarquee.propTypes = {
  direction: PropTypes.string,
};

export default ReviewMarquee;
