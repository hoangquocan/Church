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
  // const getName = (name) => {
  //   const arr = name.findIndex(' ')
  //   const arr2 = arr.shift()
  //   const result = arr2.concat(arr.map((i) => i[0]).join(''))
  //   return result
  // }
  const getName = (name) => {
    const indxChar = name.indexOf('Nhóm')
    const endInd = name.lastIndexOf(' ')
    const result = name.substring(indxChar, endInd)
    return result
  }

  const data = reportsByMonth.map((report) => ({
    name: getName(report.group.name),
    PercentCompleted: report.percentCompleted,
    PercentPresent: report.percentPresent,
  }))

  return (
    <div className="reportchart-wrapper">
      <ResponsiveContainer width="94%" height={300} fontSize="10px">
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
