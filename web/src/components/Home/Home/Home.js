import { useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { Divider, Loader } from '@mantine/core'
// import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

import RecentActivityCell from '../RecentActivityCell'
import UpcomingActivitiesCell from '../UpcomingActivitiesCell'
import MembersViewAttenCell from '../MembersViewAttenCell'
import './Home.scss'

const QUERY = gql`
  query ActivitiesHomePage {
    activitiesHome {
      id
      name
      date
      urlAttendance
      group {
        name
      }
    }
  }
`
const Home = () => {
  const { hasRole } = useAuth()
  const groupId = +localStorage.getItem('groupId')
  const time = new Date(new Date().setDate(new Date().getDate() - 1))

  const { loading, error, data } = useQuery(QUERY)
  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <Loader variant="oval" size="md" color="blue" />
      </div>
    )
  if (error)
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h4 className="text-center">Please Log In To View !</h4>
      </div>
    )
  // const activities = data.activities
  // const totalActivities = activities.length

  // for (let i = 0; i < 8; i++) {
  //   let activityRandom = activities[Math.floor(Math.random() * totalActivities)]
  //   if ((!activitiesRender.includes(activityRandom)) && (activityRandom.urlAttendance !== null)) {
  //     activitiesRender.push(activityRandom)
  //   } else {
  //     i--
  //   }
  // }
  // let activitiesRender = []
  // if (data) {
  //   activitiesRender = data.activitiesHome
  // } else {
  //   return <h2 className="text-center">No Activity Yet</h2>
  // }
// const auth = client.firebaseAuth.getAuth().currentUser
//   console.log(auth)
  return (
    <div className="home-wrapper">
      {hasRole(['leader']) && (
        <div className="home-leader">
          <UpcomingActivitiesCell groupId={groupId} time={time} />
          <div className="home-leader-view">
            <RecentActivityCell groupId={groupId} />
            <MembersViewAttenCell groupId={groupId}/>
          </div>
        </div>
      )}
    </div>
  )
}
export default Home
