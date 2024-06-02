import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { color } from 'chart.js/helpers';

export const BarGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [totalPorts, setTotalPorts] = useState(null);
  const [portDetails, setPortDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/FakeData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Parse the JSON data and extract destination ports with frequencies
        const portFrequencies = jsonData.reduce((freq, item) => {
          const { dest_port, dest_name } = item;
          freq[dest_port] = (freq[dest_port] || 0) + 1;
          return freq;
        }, {});

        // Sort the ports based on frequencies and select the top 5
        const topPorts = Object.keys(portFrequencies)
          .sort((a, b) => portFrequencies[b] - portFrequencies[a])
          .slice(0, 5);

        // Prepare data for the chart
        const chartData = {
          labels: topPorts.map(port => `Port ${port}`),
          datasets: [{
            label: 'Alerts',
            data: topPorts.map(port => portFrequencies[port]),
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',

            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        };

        setChartData(chartData);
        setTotalPorts(Object.keys(portFrequencies).length);

        // Prepare port details for display
        const portDetails = topPorts.map(port => ({
          port: port,
          name: portFrequencies[port],
        }));
        setPortDetails(portDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Top 5 Destination Ports with Most Alerts',
        color: 'white',
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'gray  ', // Set the color of the grid lines to white
        },
        ticks: {
          color: 'white', // Set the color of the tick labels to white
        },
        title: {
          display: true,
          text: 'Destination Ports',
          color: 'white',
        },
        stacked: true,
        position: 'bottom',
      },
      y: {
        grid: {
          color: 'gray  ', // Set the color of the grid lines to white
        },
        ticks: {
          color: 'white', // Set the color of the tick labels to white
        },
        beginAtZero: true,
        suggestedMax: 10,
        suggestedMin: 0,
        stepSize: 1,
        title: {
          display: true,
          text: 'Number of Alerts',
          color: 'white',
        },
        position: 'left',
        stacked: true,

      },
    },
  };

  return (
    <>
      {totalPorts && (
        // <p className="text-lg font-semibold mb-4">
        //   Total number of ports used: {totalPorts}
        // </p>

        <>
          <div className="flex flex-col items-center bg-white border shadow-inner rounded-xl dark:bg-neutral-800 dark:border-neutral-700 mb-10 p-4 md:p-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">Alert Summary</h3>
            </div>
            <div className="grid grid-cols-1  gap-4 w-full">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className=" text-sm  md:text-lg font-semibold text-blue-800">Total Ports</h4>
                <p className=" text-md md:text-2xl font-bold text-blue-600">{totalPorts}</p>
              </div>
              
            </div>
          </div>

         

        </>



      )}
      {/* {portDetails && (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Port Details:</h3>
        <div className="overflow-auto">
          <table className="table-auto w-1/5 border border-grey ">
            <thead>
              <tr>
                <th className="px-4 py-2">Port</th>
                <th className="px-4 py-2">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {portDetails.map((port, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                  <td className="border px-4 py-2">Port {port.port}</td>
                  <td className="border px-4 py-2">{port.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )} */}
      <div className='w-4/5 mx-auto'>

        {chartData && <MyChart chartData={chartData} options={options} />}
      </div>
    </>

  );
};

// New component for generating a unique chart ID
const MyChart = ({ chartData, options }) => {
  // Generate a unique ID (e.g., using Math.random())
  const chartId = Math.random().toString(36).substring(2, 15);

  return (
    <>
      {chartData && <Bar id={chartId} options={options} data={chartData} />}
    </>
  );
};

// Register the "bar" element with Chart.js
ChartJS.register({
  id: 'bar',
  beforeInit(chart, options) {
    const ctx = chart.ctx;
    // Optional: Additional chart configuration if needed
  },
});
