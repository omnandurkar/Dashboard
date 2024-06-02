import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineController
} from 'chart.js';
import moment from 'moment';
import 'chartjs-adapter-moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineController
);

export const LineGraph = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [alertTotals, setAlertTotals] = useState({
    'Potentially Bad Traffic': 0,
    'Misc Attack': 0,
    'Attempted Information Leak': 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/FakeData.json');
        const jsonData = await response.json();

        // Extract timestamps and categorize alerts
        const timestamps = jsonData.map(entry => moment(entry.timestamp));
        const categories = {
          'Potentially Bad Traffic': [],
          'Misc Attack': [],
          'Attempted Information Leak': []
        };

        const totals = {
          'Potentially Bad Traffic': 0,
          'Misc Attack': 0,
          'Attempted Information Leak': 0
        };

        jsonData.forEach(entry => {
          const category = entry.alert.category;
          const timestamp = moment(entry.timestamp);
          if (categories[category]) {
            categories[category].push(timestamp);
            totals[category] += 1;
          }
        });

        setAlertTotals(totals);

        // Prepare data for chart
        const categoryData = Object.keys(categories).map(category => {
          return {
            label: category,
            data: categories[category].map(timestamp => ({
              x: timestamp,
              y: categories[category].filter(time => time.isSame(timestamp, 'minute')).length
            })),
            borderColor: category === 'Potentially Bad Traffic' ? 'rgba(255, 99, 132, 0.7)' : category === 'Misc Attack' ? 'rgba(255, 206, 86, 0.7)' : 'rgba(54, 162, 235, 0.7)',
            backgroundColor: category === 'Potentially Bad Traffic' ? 'rgba(255, 99, 132, 0.7)' : category === 'Misc Attack' ? 'rgba(255, 206, 86, 0.7)' : 'rgba(54, 162, 235, 0.7)',
            
          };
        });

        setChartData({
          datasets: categoryData
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx1 = document.getElementById('chart1').getContext('2d');

      // Destroy existing chart (if any) before creating a new one
      const existingChart = ChartJS.getChart(ctx1);
      if (existingChart) existingChart.destroy();

      // Create a new chart with data
      new ChartJS(ctx1, {
        type: 'line',
        data: chartData,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Alert Categories Distribution Over Time',
              color: 'white',
              font: {
                size: 18
              }
            },
            tooltip: {
              enabled: true
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          scales: {
            x: {
              grid: {
                color: 'gray',
              },
              type: 'time',
              time: {
                parser: 'MM/DD/YYYY HH:mm:ss', // Moment.js format
                tooltipFormat: 'l1',
                unit: 'minute',
              },
              title: {
                display: true,
                text: 'Timestamp',
                color: 'white',
              }
            },
            y: {
              grid: {
                color: 'gray',
              },
              title: {
                display: true,
                text: 'Number of Alerts',
                color: 'white',
                
              },
              beginAtZero: true ,
              suggestedMax: 7,
              
            }
          }
        }
      });
    }
  }, [loading, chartData]);

  return (
    <div className='pb-10'>
      <div class="flex flex-col items-center bg-white border shadow-inner rounded-xl dark:bg-neutral-800 dark:border-neutral-700 mb-10 p-4 md:p-5">
    <div class="text-center mb-4">
        <h3 class="text-xl font-medium text-gray-800 dark:text-neutral-200">Alert Summary</h3>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div class="bg-red-100 p-2 md:p-4 rounded-lg text-center">
            <h4 class=" text-sm  md:text-lg md:font-semibold text-red-800">Potentially Bad Traffic</h4>
            <p class="text-md md:text-2xl font-bold text-red-600">{alertTotals['Potentially Bad Traffic']}</p>
        </div>
        <div class="bg-yellow-100 p-2 md:p-4 rounded-lg text-center">
            <h4 class=" text-sm  md:text-lg font-semibold text-yellow-800">Misc Attack</h4>
            <p class="text-md md:text-2xl font-bold text-yellow-600">{alertTotals['Misc Attack']}</p>
        </div>
        <div class="bg-blue-100 p-2 md:p-4 rounded-lg text-center">
            <h4 class=" text-sm  md:text-lg font-semibold text-blue-800">Attempted Information Leak</h4>
            <p class="text-md md:text-2xl font-bold text-blue-600">{alertTotals['Attempted Information Leak']}</p>
        </div>
    </div>
</div>


      <div className='w-3/5 mx-auto'>
        <canvas id="chart1" width="400" height="400"></canvas>
      </div>
    </div>
  );
};
