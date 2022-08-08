import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query MemberOfGroup($groupId: Int!) {
   memberOfGroup (groupId: $groupId) {
      id
      name
      email
      phoneNumber
      groupId
    }
  }
`

export const Failure = ({ error }) => {
  return (<div style={{ color: 'red' }}>Error: {error.message}</div>)
}

export const Success = ({ memberOfGroup }) => {

  return (
    <div>
      {memberOfGroup.map((member) => (
        <Member summary key={member.id} member={member} />
      ))}
    </div>
  )
}
