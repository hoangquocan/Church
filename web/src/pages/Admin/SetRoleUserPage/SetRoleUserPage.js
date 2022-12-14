import { MetaTags } from '@redwoodjs/web'
import SetRoles from 'src/components/Admin/SetRoles/SetRoles'

const SetRoleUserPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Set Role User Page" />
      <SetRoles />
    </>
  )
}

export default SetRoleUserPage
