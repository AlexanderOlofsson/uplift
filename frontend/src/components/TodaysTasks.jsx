import { useState, useEffect } from 'react';

function TodaysTasks() {
    const [tasks, setTasks] = useState({ Physical: null, Mental: null, Social: null });
    const token = localStorage.getItem('token');

    // Fetch the threedaily tasks
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/activities/daily-activities', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                } else {
                    console.error('Could not fetch daily activities:', response.statusText);
                }
            } catch (error) {
                console.error('Something went wrong fetching daily activities:', error);
            }
        };

        fetchActivities();
    }, [token]);

    // Mark the specific task as completed
    const handleCompleteTask = async (activityId, category) => {
        try {
          const response = await fetch('http://localhost:3000/statistics/complete-task', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ activityId, category }),
          });


            if (response.ok) {
                setTasks((prevTasks) => ({
                    ...prevTasks,
                    [category]: { ...prevTasks[category], completed: true },
                }));
            } else {
                console.error('Could not mark task as completed.');
            }
        } catch (error) {
            console.error('Something went wrong marking task as completed:', error);
        }
    };

    return (
        <div className="tasks-section">
            <h3>Todays Tasks</h3>
            {Object.keys(tasks).map((category) => (
                <div key={category} className="task-category">
                    <h4>{category}</h4>
                    {tasks[category] ? (
                        <div>
                            <p>{tasks[category].description}</p>
                            <button
                                disabled={tasks[category].completed} // Disable if already completed
                                onClick={() => handleCompleteTask(tasks[category].id, category)}
                            >
                                {tasks[category].completed ? 'Completed!' : 'Mark as Complete'}
                            </button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TodaysTasks;
