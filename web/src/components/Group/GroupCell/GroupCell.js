import Group from 'src/components/Group/Group'

export const QUERY = gql`
  query FindGroupById($id: Int!) {
    group: group(id: $id) {
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

export const Success = ({ group }) => {
  return <Group group={group} />
 }
