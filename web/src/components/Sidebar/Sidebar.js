import { routes } from '@redwoodjs/router'
import MenuItem from './Menu/MenuItem'
import './Sidebar.scss'

const Sidebar = () => {
  return (<div className='sidebar-wrapper'>
  <div className='sidebar-item'>
    <MenuItem to={routes.activities()} title='Activities' ionicon="accessibility-outline"/>
    <MenuItem to={routes.attendance()} title='Attendance' ionicon="newspaper-outline" />
    <MenuItem to={routes.groups()} title='Groups' ionicon="people-circle-outline" />
    <MenuItem to={routes.members()} title='Members' ionicon="person-circle-outline"/>
    <MenuItem to={routes.reports()} title='Reports' ionicon="bar-chart-outline" />
  </div>
  </div>)
}

export default Sidebar
