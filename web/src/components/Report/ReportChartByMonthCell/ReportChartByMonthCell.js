import ReportChart from '../ReportChart'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindReportsByMonthQuery($timeReport: String!) {
     reportsByMonth(timeReport: $timeReport) {
      id
      comment
      group {name}
      percentCompleted
      percentPresent
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '10%'}}>
    <Loader variant="oval" size="md" color="dark" />
  </div>
)
export const Empty = () => <h3 className='text-center'>No reports have been generated yet</h3>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ reportsByMonth }) => {
  return <ReportChart reportsByMonth={reportsByMonth}/>
}
