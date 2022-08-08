import GroupCell from 'src/components/Group/GroupCell'
import MemberOfGroupCell from 'src/components/Member/MemberOfGroupCell'

const GroupPage = ({ id }) => {
  return (
    <div>
      <GroupCell id={id} />
      <MemberOfGroupCell groupId={id} />
    </div>
  )
}

export default GroupPage
