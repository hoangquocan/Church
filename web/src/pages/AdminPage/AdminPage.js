import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SetRoles from 'src/components/Admin/SetRoles/SetRoles'
const AdminPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      <SetRoles />
    </>
  )
}

export default AdminPage
