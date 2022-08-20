import { useMutation } from '@redwoodjs/web'
import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import './Member.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const Member = ({ member, summary = false }) => {

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    refetchQueries: [
      { query: MembersQuery, variables: { id: member.groupId } },
    ],
  })
  const handleClick = (id, groupId) => {
    if (confirm('Are you sure?')) {
      updateMember({
        variables: { id, input: { groupId } },
      })
    }
  }
  return (
    <div className="member-wrapper">
      {summary ? (
        <div className="member-wrapper">
          <h4>Họ Và Tên: {member.name}</h4>
          <p>Điện Thoại: {member.phoneNumber}</p>
          <p>Email: {member.email}</p>
          <button
            className="rw-button rw-button-small rw-button-red"
            onClick={() => handleClick(member.id, null)}
          >
            DELETE
          </button>
        </div>
      ) : (
        <div>
          <table >
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>group</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{member.name}</td>
              <td>{member.birthDate}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.address}</td>
              <td>{member.group || ''}</td>
            </tr>
          </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Member
