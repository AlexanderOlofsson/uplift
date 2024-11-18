import { useEffect, useState } from 'react';
import './Mentor.css';

const Mentor = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [approvalMessage, setApprovalMessage] = useState(null);
  const mentorId = localStorage.getItem('mentorId');
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchPendingActivities = async () => {
      try {
        const response = await fetch(`${BASE_URL}/mentors/activities/${mentorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }
        const data = await response.json();
        setActivities(data.message ? [] : data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPendingActivities();
  }, [mentorId]);

  const handleApprove = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/mentors/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dailyActivityId: activityId, mentorId }),
      });

      if (!response.ok) throw new Error('Failed to approve activity');

      setActivities((prev) => prev.filter((activity) => activity.daily_activity_id !== activityId));
      setApprovalMessage('Activity approved!');
    } catch  {
      setError('Failed to approve activity');
    }
  };

  const handleReject = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/mentors/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dailyActivityId: activityId, mentorId }),
      });

      if (!response.ok) throw new Error('Failed to reject activity');

      setActivities((prev) => prev.filter((activity) => activity.daily_activity_id !== activityId));
      setApprovalMessage('Activity rejected!');
    } catch  {
      setError('Failed to reject activity');
    }
  };

  return (
    <div className="mentor-dashboard">
      <h2>Pending Activities</h2>
      {error && <p className="error-message">{error}</p>}
      {approvalMessage && <p className="approval-message">{approvalMessage}</p>}
      {activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.daily_activity_id} className="activity-item">
            <p><strong>User:</strong> {activity.user_name}</p>
            <p><strong>Category:</strong> {activity.category}</p>
            <p><strong>Description:</strong> {activity.description}</p>
            <p><strong>Date:</strong> {activity.date}</p>
            <div className="buttons">
              <button onClick={() => handleApprove(activity.daily_activity_id)}>Approve</button>
              <button onClick={() => handleReject(activity.daily_activity_id)}>Reject</button>
            </div>
          </div>
        ))
      ) : (
        <p>No pending activities for approval.</p>
      )}
    </div>


  );
};

export default Mentor;
