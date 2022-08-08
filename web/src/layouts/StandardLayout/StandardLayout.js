import Header from 'src/components/Header/Header'
import Sidebar from 'src/components/Sidebar/Sidebar'
import './StandardLayout.scss'

const StandardLayout = ({ children }) => {

  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-menu">
        <Sidebar />
        <div className="layout-content">

        {children}
        </div>
      </div>
    </div>
  )
}

export default StandardLayout
