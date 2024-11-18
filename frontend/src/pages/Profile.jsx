import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        username: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newBirthDate, setNewBirthDate] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing/hiding delete modal
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL


    // Fetch user data when all loaded, get and check token
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) return; // IF NO TOKEN STOP HERE
            try {
                const response = await fetch(`${BASE_URL}/users/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        birthDate: data.birth_date.split('T')[0], // Remove time format
                        username: data.username,
                        email: data.email
                    });
                    // Set the new values for editing
                    setNewFirstName(data.first_name);
                    setNewLastName(data.last_name);
                    setNewBirthDate(data.birth_date.split('T')[0]); // Remove time format
                    setNewUsername(data.username);
                    setNewEmail(data.email);
                } else {
                    console.error('Failed to fetch');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            // Set edit fields with current user data
            setNewFirstName(user.firstName);
            setNewLastName(user.lastName);
            setNewBirthDate(user.birthDate);
            setNewUsername(user.username);
            setNewEmail(user.email);
            setNewPassword('');
        }
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: newFirstName,
                    lastName: newLastName,
                    username: newUsername,
                    email: newEmail,
                    password: newPassword
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const updatedUser = data.user || data;
                setUser({
                    firstName: updatedUser.first_name,
                    lastName: updatedUser.last_name,
                    birthDate: updatedUser.birth_date,
                    username: updatedUser.username,
                    email: updatedUser.email
                });
                setIsEditing(false); // Toggle/navigate back to profile info
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BASE_URL}/users/profile`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('Account deleted');
                localStorage.removeItem('token'); // remove token
                window.location.href = '/login';
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="profile-container">
            <h1 className="logo">Uplift</h1>
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
                                disabled
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
                        <button onClick={handleUpdate} className="updateEditBtn">Update</button>
                        <button onClick={handleEditToggle} className="cancelEditBtn">Cancel</button>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="return-button">
                        Return to Dashboard
                    </button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Birth:</strong> {user.birthDate}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <div className="button-group">
                        <button className="editProfileBtn"
                        onClick={handleEditToggle}>Edit Profile</button>
                        <button
                            className="delete-button"
                            onClick={() => user.username && setShowDeleteModal(true)}
                            disabled={!user.username}
                        >
                            Delete Account
                        </button>
                    </div>
                    <button onClick={() => navigate('/dashboard')} className="return-button">
                        Return to Dashboard
                    </button>
                </div>
            )}
            {showDeleteModal && (
                <div className="profile-modal-overlay">
                    <div className="profile-modal-content">
                        <p>Are you sure you want to delete your account?</p>
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                handleDelete();
                            }}
                            className="confirm-delete-button"
                        >
                            Yes, delete
                        </button>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="cancel-delete-button"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
