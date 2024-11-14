import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import './TodayTasks.css'

function TodaysTasks({ token = '', onTaskComplete = () => {} }) {
  const [tasks, setTasks] = useState({ Physical: null, Mental: null, Social: null });

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

        // Notify parent that task is complete
        onTaskComplete();
      } else {
        console.error('Could not mark task as completed.');
      }
    } catch (error) {
      console.error('Something went wrong marking task as completed:', error);
    }
  };

  return (
    <div className="tasks-section">
      <h2 className="tasksTitle">Todays Tasks</h2>
      {Object.keys(tasks).map((category) => {
        const task = tasks[category];
        return (
          <div key={category} className={`task-category task-${category.toLowerCase()}`}>
            <div className="task-content">
              <h4>{category}</h4>
              <p>{task?.description || "No task available."}</p>
            </div>
            {task ? (
              <button
                className={task.completed ? 'task-button completed' : 'task-button'}
                onClick={() => {
                  // https://sweetalert2.github.io/
                  Swal.fire({
                    title: "Have you completed this task?",
                    text: "Once confirmed, this cannot be reversed.",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Complete",
                    cancelButtonText: "Cancel",
                    customClass: {
                      popup: "custom-popup",
                      title: "custom-title",
                      confirmButton: "custom-confirm-button",
                      cancelButton: "custom-cancel-button",
                      icon: "popup-icon",
                    },
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleCompleteTask(task.id, category);
                      onTaskComplete();
                      // Second popup
                      Swal.fire({
                        title: "Task Completed!",
                        text: "Great job!",
                        icon: "success",
                        confirmButtonText: "OK",
                        customClass: {
                          confirmButton: "custom-ok-button",
                          title: "custom-title2",
                          cancelButton: "custom-cancel-button2"
                        },
                      });
                    }
                  });
                }}
              >
                ✔
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

TodaysTasks.propTypes = {
  token: PropTypes.string,
  onTaskComplete: PropTypes.func,
};
export default TodaysTasks;
