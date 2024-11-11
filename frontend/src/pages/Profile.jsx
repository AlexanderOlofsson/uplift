import { useState } from 'react';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({
        firstName: 'Test',
        lastName: 'Testson',
        birthDate: '1990-01-01',
        username: 'testuser',
        email: 'test.testson@example.com'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState(user.firstName);
    const [newLastName, setNewLastName] = useState(user.lastName);
    const [newBirthDate, setNewBirthDate] = useState(user.birthDate);
    const [newUsername, setNewUsername] = useState(user.username);
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            setNewFirstName(user.firstName);
            setNewLastName(user.lastName);
            setNewBirthDate(user.birthDate);
            setNewUsername(user.username);
            setNewEmail(user.email);
            setNewPassword('');
        }
    };

    const handleUpdate = () => {
        setUser({
            firstName: newFirstName,
            lastName: newLastName,
            birthDate: newBirthDate,
            username: newUsername,
            email: newEmail,
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        alert('Account deleted');
        setUser({
            firstName: '',
            lastName: '',
            birthDate: '',
            username: '',
            email: ''
        });
    };

    return (
        <div className="profile-container">
            <h1>{isEditing ? 'Edit Profile' : 'My Profile'}</h1>
            {isEditing ? (
                <div className="edit-form">
                    <div className="input-pair">
                        <div className="input-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={newFirstName}
                                onChange={(e) => setNewFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={newLastName}
                                onChange={(e) => setNewLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-pair">
                        <div className="input-group">
                            <label>Birth (yyyy-mm-dd):</label>
                            <input
                                type="date"
                                value={newBirthDate}
                                onChange={(e) => setNewBirthDate(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="input-pair">
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label>New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="button-group">
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={handleEditToggle}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Birth:</strong> {user.birthDate}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <div className="button-group">
                        <button onClick={handleEditToggle}>Edit Profile</button>
                        <button className="delete-button" onClick={handleDelete}>Delete Account</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
