import Report from "../Report"

export const QUERY = gql`
  query ReportByGroupQuery($groupId: Int!, $startDate: DateTime!, $endDate: DateTime!) {
    groups {
      id
      name
    }
    activityInGroupByDate(groupId: $groupId, startDate: $startDate, endDate: $endDate) {
      attendance {
        present
      }
    }

  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  return <Report />
}
