import { useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { Divider, Loader } from '@mantine/core'
// import { useEffect, useMemo, useState } from 'react'
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
        <h4>Please Log In To View !</h4>
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
  let activitiesRender = []
  if (data) {
    activitiesRender = data.activitiesHome
  } else {
    return <h2 className="text-center">No Activity Yet</h2>
  }
  return (
    <div className="home-wrapper">
      <h5>Current Activities</h5>
      <Divider></Divider>
      <div className="home-activities">
        {activitiesRender.map((activity) => (
          <div key={activity.id} className="activity-random">
            <Link to={routes.activity({ id: activity.id })}>
              <img src={activity.urlAttendance} />
            </Link>
            <span>{activity.name}</span>
            <p>{activity.group.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home
