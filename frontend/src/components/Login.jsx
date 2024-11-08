import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  // Toggle between login and register
  const [isRegistering, setIsRegistering] = useState(false);

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
      e.preventDefault(); // No page refresh, please
      setError(null); // Clear any old errors

      // Choose between login or register based on form mode
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
              // If login fails, show an error
              setError(data.message || 'Login failed');
          } else {
            console.log('Login successful!');
              navigate('/dashboard'); // Off we go to the dashboard boys
          }
      } catch (error) {
          console.error('Error:', error);
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
            console.log('Account created.');
            handleFormToggle();
        }
    } catch (error) {
        console.error('Error:', error);
        setError('Something went wrong.');
    }
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
                    {isRegistering ? 'Already registerd' : 'Register'}
                </button>
            </div>
        </div>
    );
}

export default Login;
