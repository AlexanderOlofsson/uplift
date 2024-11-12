import { useState, useEffect } from 'react';
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

    // Fetch user data when all loaded, get and check token
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) return; // IF NO TOKEN STOP HERE
            try {
                const response = await fetch('http://localhost:3000/users/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
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
          const response = await fetch('http://localhost:3000/users/profile', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                  firstName: newFirstName,
                  lastName: newLastName,
                  birthDate: newBirthDate,
                  username: newUsername,
                  email: newEmail,
                  password: newPassword
              }),
          });

          if (response.ok) {
              const data = await response.json();
              console.log(data);

              const updatedUser = data.user || data;
              setUser({
                  firstName: updatedUser.first_name,
                  lastName: updatedUser.last_name,
                  birthDate: data.birth_date,
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
        const response = await fetch('http://localhost:3000/users/profile', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('Account deleted, killed and destroyed')
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
