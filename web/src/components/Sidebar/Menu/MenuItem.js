import { NavLink } from '@redwoodjs/router'
import './MenuItem.scss'

function MenuItem({ title, to, ionicon }) {
  return (
    <div className="menu-item">
      <NavLink to={to} activeClassName="active-link">
        {/* <div className="menu-icon"> */}
          <ion-icon name={ionicon}></ion-icon>
        {/* </div> */}
        {title}
      </NavLink>
    </div>
  )
}

export default MenuItem
