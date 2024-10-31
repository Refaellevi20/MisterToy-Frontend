import React from "react"
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"

import "./App.css"

import revenueData from '../data/revenueData.json'
import sourceData from '../data/sourceData.json'

defaults.maintainAspectRatio = false
defaults.responsive = true

defaults.plugins.title.display = true
defaults.plugins.title.align = "start"
defaults.plugins.title.font.size = 20
defaults.plugins.title.color = "black"

const generateColors = (num) => {
  const colors = []
  for (let i = 0; i < num; i++) {
    colors.push(`rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`)
  }
  return colors
}

export function Dashboard() {
  const sourceLabels = sourceData.map((data) => data.label || "Unknown Label")
  const sourceValues = sourceData.map((data) => data.value || 0) 
  const colors = generateColors(sourceLabels.length)

  return (
    <div className="App">
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: revenueData.map((data) => data.label || "Unknown"),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue || 0),
                backgroundColor: "rgba(6, 79, 240, 0.5)",
                borderColor: "rgba(6, 79, 240, 1)",
              },
              {
                label: "Cost",
                data: revenueData.map((data) => data.cost || 0),
                backgroundColor: "rgba(255, 48, 48, 0.5)",
                borderColor: "rgba(255, 48, 48, 1)",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
      </div>

      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: sourceLabels,
            datasets: [
              {
                label: "Count",
                data: sourceValues,
                backgroundColor: colors,
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
      </div>

      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: sourceLabels,
            datasets: [
              {
                label: "Count",
                data: sourceValues,
                backgroundColor: colors,
                borderColor: colors.map(color => color.replace(/0\.8\)/, '1)')), 
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Sources",
              },
            },
          }}
        />
      </div>
    </div>
  )
}
