import GroupCell from 'src/components/Group/GroupCell'
import GroupMembersCell from 'src/components/Group/GroupMembersCell'

const GroupPage = ({ id }) => {
  return (
    <div>
      <GroupCell id={id} />
      <GroupMembersCell id={id} />
    </div>
  )
}

export default GroupPage
