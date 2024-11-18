import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Chart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ token, triggerUpdate }) {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL

  // Fetch stats data
  const fetchStatistics = async () => {
    try {
      const response = await fetch(`${BASE_URL}/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed as always to fetch stats.");
      }

      const data = await response.json();
      setStatistics(data);
    } catch (err) {
      console.error("Something bad happend buddy, fetching stats:", err);
      setError(err.message);
    }
  };

  // Refetch when `triggerUpdate` changes
  useEffect(() => {
    fetchStatistics();
  }, [triggerUpdate]);

  if (!statistics) {
    if (error) return <p>{error}</p>;
    return <p>Stats loading...</p>;
  }

  // Calculate total tasks completed
  const totalTasksCompleted =
    statistics.mental_tasks_completed +
    statistics.physical_tasks_completed +
    statistics.social_tasks_completed;

  // Chart data
  const chartData = {
    labels: ["Mental", "Physical", "Social"],
    datasets: [
      {
        label: "Tasks Completed",
        data: totalTasksCompleted > 0
          ? [
              statistics.mental_tasks_completed,
              statistics.physical_tasks_completed,
              statistics.social_tasks_completed,
            ]
          : [1, 1, 1], // Default values for empty chart
        backgroundColor: totalTasksCompleted > 0
          ? ["#E09339", "#3367a1", "#5E9C76"]
          : ["#ccc", "#ccc", "#ccc"], // Gray color for empty chart
      },
    ],
  };

  // Tooltip customization
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = totalTasksCompleted > 0
              ? tooltipItem.raw
              : 0; // Show 0 for empty chart
            return `${tooltipItem.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="chartContainerComponent">
      <h2 className="yourStatsTitle">Your Statistics</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}

Chart.propTypes = {
  token: PropTypes.string.isRequired,
  triggerUpdate: PropTypes.number.isRequired,
};

export default Chart;
