import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartComp = () => {
    const [categoriesData, setCategoriesData] = useState({});
    const [totalAlerts, setTotalAlerts] = useState(0);

    useEffect(() => {
        // Fetch data from JSON file
        fetch('/FakeData.json')
            .then(response => response.json())
            .then(data => {
                // Count occurrences of each category
                const categoryCounts = {};
                let total = 0;
                data.forEach(entry => {
                    const category = entry.alert.category;
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                    total += 1;
                });
                setCategoriesData(categoryCounts);
                setTotalAlerts(total);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const chartData = {
        labels: Object.keys(categoriesData),
        datasets: [{
            data: Object.values(categoriesData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
                // Add more colors as needed
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                // Add more colors as needed
            ],
            borderWidth: 1
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    color: 'white',
                    font: {
                        size: 14
                    },
                    boxWidth: 40,
                    padding: 20,
                    // usePointStyle: true, 

                }
            },
            title: {
                display: true,
                text: 'Categories Pie Chart',
                color: 'white'


            }
        }
    };

    return (
        <div className="">
            <>

                <div className="flex flex-col items-center bg-white border shadow-inner rounded-xl dark:bg-neutral-800 dark:border-neutral-700 mb-10 p-4 md:p-5">
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">Alert Summary</h3>
                    </div>
                    <div className="grid grid-cols-1  gap-4 w-full">
                        <div className="bg-blue-100 p-4 rounded-lg text-center">
                            <h4 className=" text-sm  md:text-lg font-semibold text-blue-800">Total Alerts</h4>
                            <p className=" text-md md:text-2xl font-bold text-blue-600"> {totalAlerts}</p>
                        </div>

                    </div>
                </div>



            </>

            <div className='w-3/5 mx-auto'>
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};
