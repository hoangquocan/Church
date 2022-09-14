import { routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import MenuItem from './Menu/MenuItem'
import './Sidebar.scss'

const Sidebar = () => {
  const { hasRole } = useAuth()
  return (
    <div className="sidebar-wrapper">
      {/* <div className="sidebar-item"> */}
        <MenuItem
          to={routes.home()}
          title="HomePage"
          ionicon="home-outline"
        />
        <MenuItem
          to={routes.activities()}
          title="Activities"
          ionicon="pulse-outline"
        />
        <MenuItem
          to={routes.attendance()}
          title="Attendance"
          ionicon="newspaper-outline"
        />
        <MenuItem
          to={routes.groups()}
          title="Groups"
          ionicon="people-outline"
        />
        <MenuItem
          to={routes.members()}
          title="Members"
          ionicon="person-outline"
        />
        <MenuItem
          to={routes.reports()}
          title="Reports"
          ionicon="bar-chart-outline"
        />
        {hasRole('admin') && <MenuItem
          to={routes.admin()}
          title="Admin"
          ionicon="construct-outline"
        />}
      {/* </div> */}
    </div>
  )
}

export default Sidebar
