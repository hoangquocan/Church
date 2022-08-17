import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query GroupMembersQuery($id: Int!) {
    group(id: $id) {
      members {
        id
        name
        email
        phoneNumber
        address
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
    <div>
      {group.members.map((member) => (
        <Member summary key={member.id} member={member} />
      ))}
    </div>
  )
}
