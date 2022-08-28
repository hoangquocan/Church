import { MetaTags } from '@redwoodjs/web'
import GroupsCell from 'src/components/Group/GroupsCell'

const GroupsPage = () => {
  return (
    <>
      <MetaTags title="Members" description="Members page" />

      <GroupsCell />
    </>
  )
}
export default GroupsPage
