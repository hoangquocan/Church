import { useMutation } from '@redwoodjs/web'
import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import { Link, routes } from '@redwoodjs/router'
import './Members.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const Members = ({ groupId, members, isGroup = false }) => {
  const [updateMember] = useMutation(UPDATE_MEMBER, {
    refetchQueries: [
      { query: MembersQuery, variables: { id: groupId } },
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
    <div className="members-table">

      <table cellspacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Group</th>
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
              {isGroup ? (
                <td>
                  <button
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => handleClick(member.id, null)}
                  >
                    DELETE
                  </button>
                </td>
              ) : (
                <td>
                  {member.group != null ? member.group.name : 'No Group Yet'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Members
