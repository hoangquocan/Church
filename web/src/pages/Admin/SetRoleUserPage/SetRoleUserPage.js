import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SetRoles from 'src/components/Admin/SetRoles/SetRoles'

const SetRoleUserPage = () => {
  return (
    <>
      <MetaTags title="SetRoleUser" description="SetRoleUser page" />

      <SetRoles />
    </>
  )
}

export default SetRoleUserPage
