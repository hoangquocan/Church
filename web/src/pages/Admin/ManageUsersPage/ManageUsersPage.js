import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ManagerUsersCell from 'src/components/Admin/ManagerUsersCell'
const ManageUsersPage = () => {
  return (
    <>
      <MetaTags title="ManageUsers" description="ManageUsers page" />

      <ManagerUsersCell />
    </>
  )
}

export default ManageUsersPage
