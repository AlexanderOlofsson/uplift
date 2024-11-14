import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
import PrivacyPolicy from '../pages/PrivacyPolicy';

function Login({ defaultRegisterState = false }) {
  // Toggle between login and register
  const [isRegistering, setIsRegistering] = useState(defaultRegisterState);

  useEffect(() => {
    setIsRegistering(defaultRegisterState);
  }, [defaultRegisterState]);

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // State for privacy policy popup
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // Function to toggle form mode
  const handleFormToggle = () => {
    setIsRegistering(!isRegistering);
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setUsername('');
    setPassword('');
    setEmail('');
    setError(null);
    setHasConsented(false);
  };

  // Function to calculate age based on birthDate
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegistering) {
      if (!hasConsented) {
        setError('You must accept the privacy policy before registering.');
        return;
      }

      const age = calculateAge(birthDate);
      if (age < 13) {
        setError('You must be at least 13 years old to register.');
        return;
      }
    }

    isRegistering ? await handleRegister() : await handleLogin();
  };

  // Login function
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
      } else {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Server issue, try again later');
    }
  };

  // Register function
  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          birthDate,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Account creation failed.');
      } else {
        handleFormToggle();
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Something went wrong.');
    }
  };

  // Toggle privacy policy modal
  const togglePrivacyPolicy = () => {
    setPrivacyPolicyOpen(!isPrivacyPolicyOpen);
  };

  // Handle consent checkbox change
  const handleConsentChange = (checked) => {
    setHasConsented(checked);
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h1 className="logo">Uplift</h1>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              <div className="form-row">
                <div>
                  <label>First name:</label>
                  <input
                    type="text"
                    className="normalInput"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Last name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

                <div>
                  <label>Birth (yyyy-mm-dd):</label>
                  <input
                    type="date"
                    className="normalInput"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                <div>
                <label>Email:</label>
                <input
                  type="email"
                  className="normalInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
                  <label>Username:</label>
                  <input
                    type="text"
                    className="normalInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  className="normalInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <label className="pii">
              <span className="piiText"
                  onClick={togglePrivacyPolicy}

                >
                  Personally Identifiable Information
                </span>
                <input
                  type="checkbox"
                  className="preCheck"
                  checked={hasConsented}
                  onChange={() => setHasConsented(!hasConsented)}
                  disabled
                />

              </label>
            </>
          ) : (
            <>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        </form>

        <button onClick={handleFormToggle} className="regiTglBtn">
          {isRegistering ? 'Login' : 'Register'}
        </button>
        <button onClick={() => navigate('/')} className="return-button">
          Return
        </button>
        {isPrivacyPolicyOpen && (
          <div className="privacy-modal-overlay">
            <div className="privacy-modal-content">
              <button onClick={togglePrivacyPolicy} className="close-button">✕</button>
              <div className="policy-content">
                <PrivacyPolicy />
              </div>
              <label className="custom-checkbox-container">
              I have read and accept Uplift's privacy policy.
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={hasConsented}
                  onChange={(e) => handleConsentChange(e.target.checked)}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Login.propTypes = {
  defaultRegisterState: PropTypes.bool,
};

export default Login;
