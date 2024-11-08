import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleFormToggle = () => {
        setIsRegistering(!isRegistering);
        setFirstName('');
        setLastName('');
        setBirthDate('');
        setUsername('');
        setPassword('');
        setEmail('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log("Registrerar ny användare:", { firstName, lastName, birthDate, username, email, password });
        } else {
            console.log("Försöker logga in:", { username, password });
        }
        navigate('/Profile');
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
