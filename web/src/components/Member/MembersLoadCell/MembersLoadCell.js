import MembersLoad from '../MembersLoad/MembersLoad'

export const QUERY = gql`
  query MembersLoadQuery($load: Int!) {
    membersLoad(load: $load) {
      members {
        id
        name
        phoneNumber
        email
        birthDate
        urlAvatar
        group {
          id
          name
        }
        address
        createdAt
      }
      count
    }
  }
`
// export const beforQuery = ({load}) => {
//   load = load? parseInt(load) : 1
//   console.log(typeof load)
//   return {variables:  {load: load}}
// }

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ membersLoad, handleLoadMembers }) => {
  return (
    <MembersLoad
      members={membersLoad.members}
      handleLoadMembers={handleLoadMembers}
    />
  )
}
