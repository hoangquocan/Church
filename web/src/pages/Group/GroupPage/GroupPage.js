import GroupCell from 'src/components/Group/GroupCell'
import GroupMembersCell from 'src/components/Group/GroupMembersCell'
import './GroupPage.scss'
import { MetaTags } from '@redwoodjs/web'
const GroupPage = ({ id }) => {
  return (
    <div className="group-page">
      <MetaTags title="Group" />
      <GroupCell id={id} />
      <GroupMembersCell id={id} />
    </div>
  )
}

export default GroupPage
