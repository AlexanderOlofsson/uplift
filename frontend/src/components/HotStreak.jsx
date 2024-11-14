import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Hotstreak.css';
import Lottie from 'lottie-react';
import hotStreakAnimation from '../assets/lottieFiles/hotStreakAnimation.json';

function HotStreak({ token, triggerUpdate }) {
  const [streak, setStreak] = useState(0);

  const fetchStreak = async () => {
    try {
      const response = await fetch('http://localhost:3000/statistics/streak', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to check the hot hot hot streak.');
      }

      const data = await response.json();
      setStreak(data.streak_days);
    } catch (err) {
      console.error('Something went wrong while fetching streak:', err);
    }
  };

  // Fetch streak on mount and when triggerUpdate changes
  useEffect(() => {
    fetchStreak();
  }, [token, triggerUpdate]);

  const streakContainerClass = streak === 0 ? 'streakNumberContainer0' : 'streakNumberContainer';

  return (
    <div className="hotStreakContainer2">
      <h2 className="hotStreakTitle">DAY STREAK</h2>
      <div className="hotStreakAnimation">
        <Lottie
          animationData={hotStreakAnimation}
          style={{ height: '300px', width: '300px' }}
          autoplay
          loop={true}
        />
      </div>
      <div className={streakContainerClass}>
        <p>{streak}</p>
      </div>
    </div>
  );
}

HotStreak.propTypes = {
  token: PropTypes.string.isRequired,
  triggerUpdate: PropTypes.number.isRequired,
};

export default HotStreak;
