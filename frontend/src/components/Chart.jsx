import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
// https://www.npmjs.com/package/react-chartjs-2
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement,Tooltip,Legend,} from 'chart.js';

import './Chart.css'


ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ token }) {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  // Get the data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:3000/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch stats.');
        }

        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError(err.message);
      }
    };

    fetchStatistics();
  }, [token]);

  // Check if stats loaded
  if (!statistics) {
    if (error) return <p>{error}</p>;
    return <p>Stats loading...</p>;
  }

  // Chart data
const chartData = {
  labels: ['Mental', 'Physical', 'Social'],
  datasets: [
    {
      label: 'Tasks Completed',
      data: [
        statistics.mental_tasks_completed || 1,
        statistics.physical_tasks_completed || 1,
        statistics.social_tasks_completed || 1,
      ],
      backgroundColor: ['#E09339', '#3367a1', '#5E9C76'], // The colors
    },
  ],
};
const totalTasksCompleted = statistics.mental_tasks_completed +
                            statistics.physical_tasks_completed +
                            statistics.social_tasks_completed;

if (totalTasksCompleted === 0) {
  chartData.datasets[0].data = [1, 1, 1];
  chartData.datasets[0].backgroundColor = ['#ccc', '#ccc', '#ccc'];
}


  return (
<div className="chartContainerComponent">
  <h2 className="yourStatsTitle">Your Statistics</h2>
  <Pie data={chartData} />
</div>
  );
}

Chart.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Chart;
