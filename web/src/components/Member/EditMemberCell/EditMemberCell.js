import EditMember from '../EditMember'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindMemberById($id: Int!) {
    member(id: $id) {
      id
      name
      birthDate
      phoneNumber
      email
      address
      group {
        name
        id
      }
      urlAvatar
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign: 'center' }}>
    <Loader variant="oval" size="md" color="dark" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ member }) => {
  return <EditMember member={member} />
}
