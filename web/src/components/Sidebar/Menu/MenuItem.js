import { NavLink } from '@redwoodjs/router'
import './MenuItem.scss'

function MenuItem({ title, to, ionicon }) {
  return (
    <div className="menu-item">
      <NavLink to={to} activeClassName="active-link">
        <ion-icon name={ionicon}></ion-icon>
        {title}
      </NavLink>
    </div>
  )
}

export default MenuItem
