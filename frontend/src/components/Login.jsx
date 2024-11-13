import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';
import '../pages/PrivacyPolicy.css'; // Importera CSS-filen
import PrivacyPolicy from '../pages/PrivacyPolicy'; // Importera PrivacyPolicy-komponenten

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
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null); // To hold error messages

  const navigate = useNavigate(); // For redirecting after login/register

  
  const [isPrivacyPolicyOpen, setPrivacyPolicyOpen] = useState(false); 
  const [hasConsented, setHasConsented] = useState(false); 

  const handleFormToggle = () => {
    setIsRegistering(!isRegistering); // Switch form mode
    setFirstName(''); // Clear form fields
    setLastName('');
    setBirthDate('');
    setUsername('');
    setPassword('');
    setEmail('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegistering && !hasConsented) {
      setError('You must accept the privacy policy before registering.');
      return;
    }

   
    isRegistering ? await handleRegister() : await handleLogin();
  };

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

  // Ny funktion för att öppna/stänga privacy policy-modal och bevara kryssrutans status
  const togglePrivacyPolicy = () => {
    setPrivacyPolicyOpen(!isPrivacyPolicyOpen);
  };

  // Ny funktion för att hantera ändringar i samtyckeskryssrutan
  const handleConsentChange = (checked) => {
    setHasConsented(checked);
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering ? (
            <>
              <div className="form-row">
                <div>
                  <label>First name:</label>
                  <input
                    type="text"
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

              <div className="form-row">
                <div>
                  <label>Birth (yyyy-mm-dd):</label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {/* Länk till privacy policy och kryssruta för samtycke */}
              <label>
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={() => setHasConsented(!hasConsented)}
                  disabled
                />
                <span
                  onClick={togglePrivacyPolicy}
                  style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Integritetsskyddspolicy
                </span>
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

        <button onClick={handleFormToggle}>
          {isRegistering ? 'Already registered' : 'Register'}
        </button>

        {isPrivacyPolicyOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={togglePrivacyPolicy} className="close-button">✕</button>
              <div className="policy-content">
                <PrivacyPolicy />
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => handleConsentChange(e.target.checked)}
                />
                I have read and accept Uplift's privacy policy.
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
