import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { QUERY } from '../GroupAddMemCell'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const GroupAddMem = ({ members, id }) => {
  const [updateMember, { loading, error }] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      toast.success('Member added to Group!')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const handleClick = (id, groupId) => {
    if (confirm('Are you sure?')) {
      updateMember({ variables: { id, input: { groupId } } })
    }
  }
  return (
    <div className="members-table">
      <table cellspacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{new Date(member.birthDate).toLocaleDateString('sv')}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.address}</td>
              <td>
                <button
                  className="rw-button rw-button-small rw-button-green"
                  disabled={loading}
                  onClick={() => handleClick(member.id, id)}
                >
                  Add To Group
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupAddMem
