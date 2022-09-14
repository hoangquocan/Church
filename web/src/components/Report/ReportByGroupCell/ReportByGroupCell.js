import ReportInfo from '../ReportInfo'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query ReportByGroupQuery(
    $groupId: Int!
    $fromDate: DateTime!
    $toDate: DateTime!
  ) {
    activities: activityInGroupByDate(
      groupId: $groupId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      id
      name
      group {
        name
      }
      attendance {
        present
      }
    }
  }
`

export const beforeQuery = ({ timequery }) => {
  return { variables: timequery }
}
export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="dark" />
  </div>
)
export const Empty = () => <h2 className='text-center'>No activities have been generated yet</h2>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities, timequery }) => {
  return <ReportInfo activities={activities} infoQuery={timequery} />
}
