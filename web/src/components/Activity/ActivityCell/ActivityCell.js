import Activity from '../Activity/Activity'

export const QUERY = gql`
  query FindActivityQuery($id: Int!) {
    activity(id: $id) {
      id
      name
      date
      group {
        id
        name
        members {
          id
          name
          email
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ activity}) => {
  return <Activity activity={activity} />
}
