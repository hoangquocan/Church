import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import Member from 'src/components/Member/Member'

export const QUERY = gql`
  query MemberNoGroupQuery {
    membersNogroup {
      id
      name
      birthDate
      address
      phoneNumber
      email
      createdAt
    }
  }
`
const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
export const Success = ({ membersNogroup, id }) => {
  const [updateMember, { loading, error }] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      toast.success('Member added to Group!')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const handleClick = (id, groupId) => {
    updateMember({ variables: { id, input: {groupId} }})
  }
  return (
    <div>
      {membersNogroup.map((member) => (
        <div key={member.id}>
          <Member  member={member} />
          <button className="rw-button rw-button-small rw-button-green" disabled={loading} onClick={() => handleClick(member.id, id )}>Add To Group</button>
        </div>
      ))}
    </div>
  )
}
