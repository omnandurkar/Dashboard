import React from 'react'
import { PieChartComp } from './PieChart'
import { LineGraph } from './LineGraph'
import { BarGraph } from './BarGraph'





export const Dashboard = () => {
    return (
        <>

            <div className='flex flex-col justify-center items-center my-20 p-10'>
                <h1>Dashboard</h1>
                <div>

                    <LineGraph />
                    <BarGraph />
                </div>
                <PieChartComp />

            </div>

        </>
    )
}
