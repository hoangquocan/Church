export const QUERY = gql`
  query FindAttendanceQuery($id: Int!) {
    attendance: attendance(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ attendance }) => {
  return <div>{JSON.stringify(attendance)}</div>
}
