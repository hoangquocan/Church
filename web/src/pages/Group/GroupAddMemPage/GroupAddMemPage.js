import GroupAddMemCell from 'src/components/Group/GroupAddMemCell'
import { MetaTags } from '@redwoodjs/web'

const GroupAddMemPage = ({ id, name }) => {
  return (
    <>
      <MetaTags title="Add Member" />
      <GroupAddMemCell id={id} name={name} />
    </>
  )
}

export default GroupAddMemPage
