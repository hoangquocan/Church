import Member from '../Member/Member'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query FindMemberQuery($id: Int!) {
    member(id: $id) {
      id
      name
      birthDate
      email
      phoneNumber
      address
      urlAvatar
      group {
        name
      }
      createdAt
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ member }) => {
  return <Member member={member} />
}
