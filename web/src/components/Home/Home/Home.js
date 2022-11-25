import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Divider } from '@mantine/core'

import RecentActivityCell from '../RecentActivityCell'
import UpcomingActivitiesCell from '../UpcomingActivitiesCell'
import MembersViewAttenCell from '../MembersViewAttenCell'
import ManagerQuarterCell from 'src/components/Manager/ManagerQuarterCell'
import ActivitiesOutOfDateCell from 'src/components/Manager/ActivitiesOutOfDateCell/ActivitiesOutOfDateCell'
import './Home.scss'


const Home = () => {
  const [quarter, setQuarter] = useState()
  const [viewQuarter, setViewQuarter] = useState(false)
  const { hasRole } = useAuth()
  const groupId = +localStorage.getItem('groupId')
  const time = new Date(new Date().setHours(0,0,0,0))

  // for (let i = 0; i < 8; i++) {
  //   let activityRandom = activities[Math.floor(Math.random() * totalActivities)]
  //   if ((!activitiesRender.includes(activityRandom)) && (activityRandom.urlAttendance !== null)) {
  //     activitiesRender.push(activityRandom)
  //   } else {
  //     i--
  //   }
  // }
  const month = quarter?.getMonth() + 1
  const year = quarter?.getFullYear()
  
  return (
    <>
      <div className="home-wrapper">
        {hasRole(['leader']) && (
          <div className="home-leader">
            <Divider size="md" mt={30} mb={40} />
            <h1 className="text-title">Upcoming Activities</h1>
            <UpcomingActivitiesCell groupId={groupId} time={time} />
            <Divider size="md" mt={30} mb={40} />
            <div className="home-leader-view">
              <RecentActivityCell groupId={groupId} />
              <MembersViewAttenCell groupId={groupId} />
            </div>
          </div>
        )}
        {hasRole(['admin', 'manager']) && (
          <div className="home-manager">
            <Divider size="md" mb={30} />
            <h1 className='text-title'>Manager Quarter Report</h1>
            <div className="home-manager-quarterPicker">
              <DatePicker
                selected={quarter}
                onChange={(date) => setQuarter(date)}
                dateFormat="QQQ, yyyy"
                showQuarterYearPicker
                popperPlacement="bottom"
                placeholderText="Select Quarter To View"
                tabIndex={4}
              />
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  fontSize: '20px',
                  fontWeight: 500,
                  minWidth: '130px',
                  height: '100%',
                  color: '#fff',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
                  backgroundImage: 'linear-gradient(to right, #753a88, #C2255C)',
                }}
                onClick={() => setViewQuarter(true)}
              >
                Submit
                {/* <ion-icon name="eye-outline"></ion-icon> */}
              </button>
            </div>
            {viewQuarter && <ManagerQuarterCell month={month} year={year} />}
            <Divider size="md" mt={40} mb={40} />
          <ActivitiesOutOfDateCell time={time}/>
          </div>
        )}
      </div>
    </>
  )
}
export default Home
