import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { memo } from 'react'
import './ReportChart.scss'

const ReportChart = ({ reportsByMonth }) => {
  const data = reportsByMonth.map((report) => ({
    name: report.group.name
      .split('')
      .filter((i) => i.match(/([A-Z]|-)/))
      .join(''),
    PercentCompleted: report.percentCompleted,
    PercentPresent: report.percentPresent,
  }))

  return (
    <div className="reportchart-wrapper">
      <ResponsiveContainer width="94%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, bottom: 5, left: 0 }}
        >
          <Line type="monotone" dataKey="PercentCompleted" stroke="#8884d8" />
          <Line type="monotone" dataKey="PercentPresent" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default memo(ReportChart)
