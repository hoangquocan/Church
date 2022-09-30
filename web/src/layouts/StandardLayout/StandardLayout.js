import Header from 'src/components/Header/Header'
import Sidebar from 'src/components/Sidebar/Sidebar'
import Footer from 'src/components/Footer/Footer'
import './StandardLayout.scss'
import { RefContext } from 'src/components/Context/Context/Context'
import { useContext } from 'react'

const StandardLayout = ({ children }) => {
  const context = useContext(RefContext)
  return (
    <div className="layout-wrapper">
      <Sidebar />
      <div className="layout-container" ref={context.containerRef}>
        <Header />
        <div className="layout-content">{children}</div>
        <Footer />
        <div className='background-layout__effect'>

        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        <div className="circle-container">
          <div className="circle"></div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default StandardLayout
