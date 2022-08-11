import ActivityForm from 'src/components/Activity/ActivityForm'

export const QUERY = gql`
  query Groups_query {
    groups {
      id
      name
      leader
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  return <ActivityForm groups={groups} />
}
