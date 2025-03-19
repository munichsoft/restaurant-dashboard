"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { useTranslation } from "react-i18next"

interface DetailedChartProps {
  item: string
  type: "dish" | "category"
}

const sampleData = [
  { name: "12:00", uv: 4000, pv: 2400, amt: 2400 },
  { name: "13:00", uv: 3000, pv: 1398, amt: 2210 },
  { name: "14:00", uv: 2000, pv: 9800, amt: 2290 },
  { name: "15:00", uv: 2780, pv: 3908, amt: 2000 },
  { name: "16:00", uv: 1890, pv: 4800, amt: 2181 },
  { name: "17:00", uv: 2390, pv: 3800, amt: 2500 },
  { name: "18:00", uv: 3490, pv: 4300, amt: 2100 },
]

export default function DetailedChart({ item, type }: DetailedChartProps) {
  const { t } = useTranslation()
  const [data, setData] = useState(sampleData)

  useEffect(() => {
    // In a real application, you would fetch data based on item and type
    // For now, we're using sample data
    setData(sampleData)
  }, [item, type])

  return (
    <div>
      <h3>{t(type === "dish" ? "dishRevenue" : "categoryRevenue")}</h3>
      <p>{t("detailedView", { item })}</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

