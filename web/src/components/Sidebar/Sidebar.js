import { useAuth } from '@redwoodjs/auth'
import { useContext } from 'react'
import { Link, routes } from '@redwoodjs/router'

import { RefContext } from '../Context/Context/Context'
import NavbarLinksGroup from './NavbarLinksGroup/NavbarLinksGroup'
import NavbarNested from './NavbarNested/NavbarNested'
import logo from 'src/Assets/images/Logo.png'
import './Sidebar.scss'

const admin = [
  {
    label: 'Admin',
    icon: 'construct-outline',
    links: [
      { label: 'Set UserRole', to: '/admin/set-role-user' },
      { label: 'Manage Users', to: '/admin/manage-users' },
      { label: 'Admin Page', to: '/admin' },
    ],
  },

]
const manager = [{
  label: 'Manager',
  icon: 'build-outline',
  links: [
    { label: 'Create Questions', to: '/manager/create-question' },
    { label: 'View Questions', to: '/manager/questions' },
    { label: 'Export Survey', to: '/manager/export-survey' },
  ],
},]

const adminLink = admin.map((item) => (
  <NavbarLinksGroup key={item.label} {...item} />
))
const managerLink = manager.map((item) => (
  <NavbarLinksGroup key={item.label} {...item} />
))
const Sidebar = () => {
  const context = useContext(RefContext)
  const { hasRole } = useAuth()



  return (
    <>
      <div className="sidebar-wrapper" ref={context.sidebarRef}>
       <div className="logo">
        <Link to={routes.home()}>
          <img src={logo} alt="VGM" />
          <span style={{ fontFamily: 'Lobster Two' }}>
            ChurchSystem<span>v0.0.1</span>
          </span>
        </Link>
      </div>
      <NavbarNested />
      {hasRole(['admin']) && adminLink}
      {hasRole(['admin', 'manager']) && managerLink}
      </div>

    </>
  )
}

export default Sidebar
