import ReportInfo from "../ReportInfo"

export const QUERY = gql`
  query ReportByGroupQuery($groupId: Int!, $fromDate: DateTime!, $toDate: DateTime!) {
    activities: activityInGroupByDate(groupId: $groupId, fromDate: $fromDate, toDate: $toDate) {
      name
      attendance {
        present
      }
    }

  }
`
export const beforeQuery = ({variables}) => {
  return { variables: variables }
}
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activities }) => {
  return <ReportInfo activities={activities}/>
}
