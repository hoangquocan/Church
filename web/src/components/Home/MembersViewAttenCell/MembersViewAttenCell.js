import MemberAttendance from "../MemberAttendance/MemberAttendance"
import { Loader, Skeleton } from "@mantine/core"
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
  <div style={{ textAlign:'center', marginTop: '5%'}}>
    <Skeleton height={60} mt={16} width="50%" radius="md" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
    <Skeleton height={50} mt={20} radius="sm" />
  </div>
)

export const Empty = () => <div></div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}></div>
)

export const Success = ({ group }) => {
  return <MemberAttendance group={group}/>
}
