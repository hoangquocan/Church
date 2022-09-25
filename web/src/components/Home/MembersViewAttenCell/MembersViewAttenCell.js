import MemberAttendance from "../MemberAttendance/MemberAttendance"
import { Loader } from "@mantine/core"
export const QUERY = gql`
  query MembersViewAttenQuery($id: Int!) {
    group(id: $id) {
      id
      members {
        id
        name
        urlAvatar
        attendance {
          id
          present
        }
      }
    }
  }
`
export const beforeQuery = ({ groupId }) => {
  return {variables: {id: groupId}}
}

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ group }) => {
  return <MemberAttendance group={group}/>
}
