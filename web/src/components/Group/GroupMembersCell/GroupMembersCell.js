import Members from 'src/components/Member/Members/Members'

export const QUERY = gql`
  query GroupMembersQuery($id: Int!) {
    group(id: $id) {
      id
      members {
        id
        name
        email
        birthDate
        phoneNumber
        address
        group{
          name
          id
        }
        groupId
      }
    }
  }
`

export const Failure = ({ error }) => {
  return <div style={{ color: 'red' }}>Error: {error.message}</div>
}

export const Success = ({ group }) => {

  return (
   <Members groupId={group.id} members={group.members} isGroup={true}/>
  )
}
