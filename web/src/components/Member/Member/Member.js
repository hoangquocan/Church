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
  const formattedDate = (datetime) => {
    const parsedDate = new Date(datetime)
    const month = parsedDate.toLocaleString('default', { month: 'long' })
    return `${parsedDate.getDate()} ${month} ${parsedDate.getFullYear()}`
  }

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
          <h4>Họ Và Tên: {member.name}</h4>
          <h5>Ngày Sinh: {formattedDate(member.birthDate)}</h5>
          <h5>Địa Chỉ: {member.address}</h5>
          <p>Điện Thoại: {member.phoneNumber}</p>
          <p>Email: {member.email}</p>
          <p>
            Khởi Tạo:{' '}
            <time dateTime={member.createdAt}>
              {formattedDate(member.createdAt)}
            </time>
          </p>
        </div>
      )}
    </div>
  )
}

export default Member
