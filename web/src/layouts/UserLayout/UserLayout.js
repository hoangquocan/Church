import { Link, routes } from '@redwoodjs/router'
import './UserLayout.scss'
import Header from 'src/components/Header/Header/Header'

const UserLayout = ({ children }) => {
  return (
    <div className="userlayout-wrapper">
      <div className="userlayout-container">
        <Header />
        <div className="userlayout-content">
          <Link to={routes.home()}>
            <ion-icon
              style={{
                position: 'fixed',
                zIndex: '101',
                color: '#45f3ff',
                fontSize: '30px',
                top: '10px',
                left: '40px',
              }}
              name="home-outline"
            ></ion-icon>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout
