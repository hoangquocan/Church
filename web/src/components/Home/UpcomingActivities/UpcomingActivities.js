import { Blockquote, Modal } from '@mantine/core'
import { useRef, useState, useEffect } from 'react'
import Attendance from 'src/components/Attendance/Attendance'

import './UpcomingActivities.scss'

const UpcomingActivities = ({ upcomingActivities }) => {
  const [opened, setOpened] = useState(false)
  const [activity, setActivity] = useState()
  const btnRefs = useRef([])
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, 3)
  }, [upcomingActivities])

  const handleMouseEnter = (i) => {
    setTimeout(() => {
      btnRefs.current[i].classList.add('hovered')
    }, 500)
  }
  const handleMouseLeave = (i) => {
    setTimeout(() => {
      btnRefs.current[i].classList.remove('hovered')
    }, 600)
  }
  const handleModal = () => {
    setOpened(false)
  }

  return (
    <div className="upcomingActivities-wrapper">
      {upcomingActivities.map((activity, i) => (
        <div
          key={activity.id}
          className="activity-item"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <Blockquote>
            <div className="name">{activity.name}</div>
          </Blockquote>
          <div>
            <div className="date">{new Date(activity.date).toDateString()}</div>
            <div className="time">
              {new Date(activity.date).toLocaleTimeString()}
            </div>
          </div>
          <div
            className="attendance-btn"
            ref={(el) => (btnRefs.current[i] = el)}
            onClick={() => {
              setActivity(activity)
              setOpened(true)
            }}
          >
            Attendance<ion-icon name="arrow-forward-circle-outline"></ion-icon>
          </div>
        </div>
      ))}
      <Modal
        title="Make Attendance"
        opened={opened}
        onClose={() => setOpened(false)}
        zIndex={101}
        overlayOpacity={0.2}
        overlayBlur={3}
        centered
        styles={(theme) => ({
          root: {
            '@media(max-width: 480px)': {},
          },
          modal: {
            background: '#2C2E33',
            // background: 'linear-gradient(  #5C5F66,#5C5F66,#5C5F66)',
            boxShadow: '0 15px 25px rgba(0, 0, 0, .9)',
            width: 800,
            borderRadius: '10px',
            '@media(max-width: 768px)': {
              width: 600,
            },
            '@media(max-width: 480px)': {
              width: 410,
              padding: 2,
            },
          },
          title: {
            margin: '0 auto',
            fontSize: '28px',
            fontWeight: 500,
            color: '#fff',
            // marginBottom: 0,
          },
          inner: { backgroundColor: 'transparent' },
          close: {
            backgroundColor: '#DEE2E6',
            // borderColor: '#000',
            marginRight: 14,
            marginTop: 2,
            color: '#000',
            borderRadius: '50%',
          },
        })}
      >
        <Attendance activity={activity} handleModal={handleModal} />
      </Modal>
    </div>
  )
}

export default UpcomingActivities
