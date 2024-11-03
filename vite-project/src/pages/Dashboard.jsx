// import React from "react"
// import { Chart as ChartJS, defaults } from "chart.js/auto"
// import { Bar, Doughnut, Line } from "react-chartjs-2"

// import "./App.css"

// import revenueData from '../data/revenueData.json'
// import sourceData from '../data/sourceData.json'

// defaults.maintainAspectRatio = false
// defaults.responsive = true

// defaults.plugins.title.display = true
// defaults.plugins.title.align = "start"
// defaults.plugins.title.font.size = 20
// defaults.plugins.title.color = "black"

// const generateColors = (num) => {
//   const colors = []
//   for (let i = 0; i < num; i++) {
//     colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`)
//   }
//   return colors
// }

// export function Dashboard() {
//   const sourceLabels = sourceData.map((data) => data.label || "Unknown Label")
//   const sourceValues = sourceData.map((data) => data.value || 0) 
//   const colors = generateColors(sourceLabels.length)

//   return (
//     <div className="App">
//       <div className="dataCard revenueCard">
//         <Line
//           data={{
//             labels: revenueData.map((data) => data.label || "Unknown"),
//             datasets: [
//               {
//                 label: "Revenue",
//                 data: revenueData.map((data) => data.revenue || 0),
//                 backgroundColor: "rgba(6, 79, 240, 0.5)",
//                 borderColor: "rgba(6, 79, 240, 1)",
//               },
//               {
//                 label: "Cost",
//                 data: revenueData.map((data) => data.cost || 0),
//                 backgroundColor: "rgba(255, 48, 48, 0.5)",
//                 borderColor: "rgba(255, 48, 48, 1)",
//               },
//             ],
//           }}
//           options={{
//             elements: {
//               line: {
//                 tension: 0.5,
//               },
//             },
//             plugins: {
//               title: {
//                 text: "Monthly Revenue & Cost",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard customerCard">
//         <Bar
//           data={{
//             labels: sourceLabels,
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceValues,
//                 backgroundColor: colors,
//                 borderRadius: 5,
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Source",
//               },
//             },
//           }}
//         />
//       </div>

//       <div className="dataCard categoryCard">
//         <Doughnut
//           data={{
//             labels: sourceLabels,
//             datasets: [
//               {
//                 label: "Count",
//                 data: sourceValues,
//                 backgroundColor: colors,
//                 borderColor: colors.map(color => color.replace(/0\.8\)/, '1)')), 
//                 borderWidth: 2,
//               },
//             ],
//           }}
//           options={{
//             plugins: {
//               title: {
//                 text: "Revenue Sources",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { toyService } from '../services/toy.service.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Toy Price Stats',
        },
    },
}

export function Dashboard() {
    const [data, setData] = useState(null)
    const [priceData, setPriceData] = useState(null)

    useEffect(() => {
        toyService.getImportanceStats().then(stats => {
            const labels = stats.map(stat => stat.label)
            const toyAmount = stats.map(stat => stat.toyAmount)
            const avgPrice = stats.map(stat => stat.avgPrice)

            const chartData = {
                labels,
                datasets: [
                    {
                        label: 'Toy Amount ',
                        data: toyAmount,
                        backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    }
                ],
            }

            const priceChartData = {
                labels,
                datasets: [
                    {
                        label: 'Average Price',
                        data: avgPrice,
                        backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    }
                ],
            }

            setData(chartData)
            setPriceData(priceChartData)
        })
    }, [])

    if (!data || !priceData) return <div>Loading...</div>

    return (
        <div>
            <Bar options={options} data={data} style={{ width: '80vw', height: '40vh' }} />
            <Bar options={{ ...options, title: { display: true, text: 'Average Price per Label' } }} data={priceData} style={{ width: '80vw', height: '40vh', marginTop: '20px' }} />
        </div>
    )
}
