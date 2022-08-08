import { routes } from '@redwoodjs/router'
import MenuItem from './Menu/MenuItem'
import './Sidebar.scss'

const Sidebar = () => {
  return (<nav className='sidebar-wrapper'>
  <MenuItem to={routes.activities()} title='Activities'/>
  <MenuItem to={routes.groups()} title='Groups'/>
  <MenuItem to={routes.members()} title='Members'/>
  <MenuItem to={routes.attendance()} title='Attendance'/>
  <MenuItem to={routes.reports()} title='Reports'/>
  </nav>)
}

export default Sidebar
