// import { useMutation } from '@redwoodjs/web'
// import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import { Link, routes } from '@redwoodjs/router'
import './Member.scss'

// const UPDATE_MEMBER = gql`
//   mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
//     updateMember(id: $id, input: $input) {
//       id
//       groupId
//     }
//   }
// `
const Member = ({ member }) => {
  // const [updateMember] = useMutation(UPDATE_MEMBER, {
  //   refetchQueries: [
  //     { query: MembersQuery, variables: { id: member.groupId } },
  //   ],
  // })
  // const handleClick = (id, groupId) => {
  //   if (confirm('Are you sure?')) {
  //     updateMember({
  //       variables: { id, input: { groupId } },
  //     })
  //   }
  // }
  const thumbnail = (url) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:100')
    return parts.join('/')
  }
  return (
    <div className="member-wrapper">
      <div className="member-avatar">
        <Link
          to={routes.editMember({id: member.id})}
          title='Update Member'
        >
          {member.urlAvatar ? (
            <img src={thumbnail(member.urlAvatar)} alt="Avatar" />
          ) : (
            <ion-icon name="person-outline"></ion-icon>
          )}
          <ion-icon name="camera-reverse-outline"></ion-icon>
        </Link>
      </div>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th>FullName</th>
            <td>{member.name}</td>
          </tr>
          <tr>
            <th>Date Of Birth</th>
            <td>{new Date(member.birthDate).toLocaleDateString('sv')}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{member.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{member.phoneNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{member.address}</td>
          </tr>
          <tr>
            <th>Group</th>
            <td>{member.group !== null ? member.group.name: <Link className='inline-button inline-button-small inline-button-green'
            to={routes.groups()}>Add To One Group</Link>}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{new Date(member.createdAt).toLocaleDateString('sv')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Member
