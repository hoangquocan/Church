import GroupForm from 'src/components/Group/GroupForm'
import { MetaTags } from '@redwoodjs/web'

const NewGroupPage = () => {
  return (
    <>
      <MetaTags title="New Group" />
      <GroupForm />
    </>
  )
}

export default NewGroupPage
