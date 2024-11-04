import  { useState } from 'react';
import './Login.css';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleFormToggle = () => {
        setIsRegistering(!isRegistering);
        setUsername('');
        setPassword('');
        setEmail('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log("Registrerar ny användare:", { username, password, email });
        } else {
            console.log("Försöker logga in:", { username, password });
        }
    };

    return (
        <div className="user-form-container">
            <div className="user-form">
                <h2>{isRegistering ? 'Skapa Konto' : 'Logga In'}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required // fyll i det här fältet
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

                    {isRegistering && (
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit">{isRegistering ? 'Registrera' : 'Logga In'}</button>
                </form>

                <button onClick={handleFormToggle}>
                    {isRegistering ? 'Har du redan ett konto? Logga in' : 'Skapa inlogg'}
                </button>
            </div>
        </div>
    );
}

export default Login;
