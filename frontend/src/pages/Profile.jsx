import { useState } from 'react';
import './Profile.css';

function Profile() {
    // Ställa in initiala användardata
    const [user, setUser] = useState({
        firstName: 'Test',
        lastName: 'Testson',
        email: 'Test.Testson@example.com'
    });



    const [isEditing, setIsEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState(user.firstName);
    const [newLastName, setNewLastName] = useState(user.lastName);
    const [newEmail, setNewEmail] = useState(user.email);

    // Toggle mellan visningsläge och redigeringsläge
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setNewFirstName(user.firstName);
            setNewLastName(user.lastName);
            setNewEmail(user.email);
        }
    };

    // Uppdatera användardata
    const handleUpdate = () => {
        setUser({
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail
        });
        setIsEditing(false);
    };

    // Ta bort användardata 
    const handleDelete = () => {
        alert('Användarkonto raderat');
        setUser({
            firstName: '',
            lastName: '',
            email: ''
        });
    };

    return (
        <div className="profile-container">
            <h1>Min Profil</h1>
            {isEditing ? (
                <div className="edit-form">
                    <label>
                        Förnamn:
                        <input
                            type="text"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                    </label>
                    <label>
                        Efternamn:
                        <input
                            type="text"
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </label>
                    <label>
                        E-post:
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </label>
                    <button onClick={handleUpdate}>Uppdatera</button>
                    <button onClick={handleEditToggle}>Avbryt</button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>Förnamn:</strong> {user.firstName}</p>
                    <p><strong>Efternamn:</strong> {user.lastName}</p>
                    <p><strong>E-post:</strong> {user.email}</p>
                    <button onClick={handleEditToggle}>Redigera</button>
                </div>
            )}
            <button className="delete-button" onClick={handleDelete}>Radera Konto</button>
        </div>
    );
}

export default Profile;
