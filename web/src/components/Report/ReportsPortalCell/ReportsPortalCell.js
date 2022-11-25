import ReportPortal from '../ReportPortal'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindReportsPortalQuery($fromMonth: DateTime!, $toMonth: DateTime!) {
    reportsPortal(fromMonth: $fromMonth, toMonth: $toMonth) {
      totalMembers
      totalMonthMembers
      totalGroups
      totalMonthGroups
      totalMonthActivities
    }
  }
`
export const beforeQuery = ({fromMonth, toMonth }) => {
  return {variables: {fromMonth, toMonth}}
}

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '10%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ reportsPortal }) => {
  return <ReportPortal reportsPortal={reportsPortal}/>
}
