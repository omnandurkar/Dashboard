import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineGraph } from '../../components/LineGraph';
import { BarGraph } from '../../components/BarGraph';
import { PieChartComp } from '../../components/PieChart';

export const Home = () => {
    const [activeComponent, setActiveComponent] = useState('Dashboard'); // Initially set to Dashboard

    const handleComponentClick = (componentName) => {
        setActiveComponent(componentName);
    };

    let componentToRender;

    switch (activeComponent) {
        case 'Categories':
            componentToRender = <PieChartComp />;
            break;
        case 'Destination Ports':
            componentToRender = <BarGraph />;
            break;
        case 'Distribution Over Time':
            componentToRender = <LineGraph />;
            break;
        default:
            componentToRender = (
                <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:px-20"> {/* Adjusted lg:ps-72 to lg:px-20 for consistent padding */}
                    <header className="text-center">
                        <p className="mb-2 text-sm font-semibold text-blue-300 dark:text-blue-400">Welcome  💙</p> {/* Adjusted text-blue-600 to text-blue-300 for darker shade */}
                        <h1 className="block text-2xl font-bold text-gray-200 sm:text-3xl dark:text-white">Dashboard : Check all Insights of Alerts</h1> {/* Adjusted text-gray-800 to text-gray-200 and dark:text-neutral-200 to dark:text-white */}
                        <p className="mt-2 text-lg text-gray-300 dark:text-gray-400">Surf through all the insights </p> {/* Adjusted text-gray-800 to text-gray-300 and dark:text-neutral-200 to dark:text-gray-400 */}
                        <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                            <a className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-400 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 disabled:opacity-50 disabled:pointer-events-none" href="/"> {/* Adjusted Link to a and adjusted text-blue-600 to text-blue-400 and dark:text-blue-500 */}
                                <svg className="flex-shrink-0 h-5 w-5 rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> {/* Adjusted size-4 to h-5 w-5 */}
                                    <path fillRule="evenodd" d="M15.707 9.293a1 1 0 0 0-1.414-1.414L11 11.586V3a1 1 0 1 0-2 0v8.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5z" clipRule="evenodd" />
                                </svg>
                                Checkout the Insights
                            </a>
                        </div>
                    </header>
                </div>
            );
    }

    return (
        <>
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
                {/* Sidebar toggle button */}
            </div>

            {/* Sidebar */}
            <div id="application-sidebar-dark" className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-black shadow-2xl shadow-gray-500  border-e border-gray-800 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                <div className="px-6">
                    {/* Brand logo */}
                    <a className="flex-none text-xl font-semibold text-white focus:outline-none focus:ring-1 focus:ring-gray-600" href="#" aria-label="Brand">Alert Insights</a>
                </div>

                {/* Sidebar navigation */}
                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">
                        <li>
                            {/* Dashboard button */}
                            <button
                                className={`w-full flex items-center gap-x-3 py-2 px-2.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 ${activeComponent === 'Dashboard' ? 'bg-blue-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                                onClick={() => handleComponentClick('Dashboard')}
                            >
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                Dashboard
                            </button>
                        </li>
                        <li>
                            {/* Categories button */}
                            <button
                                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:blue-gray-600 ${activeComponent === 'Categories' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                                onClick={() => handleComponentClick('Categories')}
                            >
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                Categories
                            </button>
                        </li>
                        <li>
                            {/* Destination Ports button */}
                            <button
                                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 ${activeComponent === 'Destination Ports' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                                onClick={() => handleComponentClick('Destination Ports')}
                            >
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                Destination Ports
                            </button>
                        </li>
                        <li>
                            {/* Distribution Over Time button */}
                            <button
                                className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 ${activeComponent === 'Distribution Over Time' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                                onClick={() => handleComponentClick('Distribution Over Time')}
                            >
                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                Distribution Over Time
                            </button>
                        </li>
                        {/* Other sidebar buttons */}
                    </ul>
                </nav>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
                {componentToRender}
            </div>

            {/* Bottom navigation */}
            <div className="fixed bottom-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
                <nav className="flex justify-around py-2 space-x-4">
                    <button
                        className={`text-sm font-semibold ${activeComponent === 'Dashboard' ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                        onClick={() => handleComponentClick('Dashboard')}
                    >
                        Dashboard
                    </button>

                    {/* Categories button */}
                    <button
                        className={`text-sm font-semibold ${activeComponent === 'Categories' ? 'text-blue-600' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        onClick={() => handleComponentClick('Categories')}
                    >

                        Categories
                    </button>


                    {/* Destination Ports button */}
                    <button
                        className={`text-sm font-semibold ${activeComponent === 'Destination Ports' ? 'text-blue-600' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                        onClick={() => handleComponentClick('Destination Ports')}
                    >

                        Destination Ports
                    </button>

                    {/* Distribution Over Time button */}
                    <button
                        className={`text-sm font-semibold ${activeComponent === 'Distribution Over Time' ? 'text-blue-600' : 'text-gray-400 hover:bg-gray-800 hover:text-white-300'}`}
                        onClick={() => handleComponentClick('Distribution Over Time')}
                    >

                        Distribution Over Time
                    </button>

                </nav>
            </div>
        </>
    );
}
