import { MetaTags } from '@redwoodjs/web'
import ManagerUsersCell from 'src/components/Admin/ManagerUsersCell'

const ManageUsersPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Manage Users Page" />
      <ManagerUsersCell />
    </>
  )
}

export default ManageUsersPage
