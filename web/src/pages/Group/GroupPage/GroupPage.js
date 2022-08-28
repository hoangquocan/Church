import GroupCell from 'src/components/Group/GroupCell'
import GroupMembersCell from 'src/components/Group/GroupMembersCell'

import './GroupPage.scss'
const GroupPage = ({ id }) => {
  return (
    <div className='group-page'>
      <GroupCell id={id} />
      <GroupMembersCell id={id} />
    </div>
  )
}

export default GroupPage
