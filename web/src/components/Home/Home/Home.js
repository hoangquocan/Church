import { QUERY } from 'src/components/Activity/ActivitiesCell'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useMemo, useState } from 'react'
import './Home.scss'

const Home = () => {
  const { loading, error, data } = useQuery(QUERY)
  if (loading) return <h1 className="text-center">Loading...</h1>
  if (error) return `Error! ${error.message}`
  const activities = data.activities
  const totalActivities = activities.length
// console.log("render HOme")
  const activitiesRender = []

  for (let i = 0; i < 4; i++) {
    let activityRandom = activities[Math.floor(Math.random() * totalActivities)]
    if ((!activitiesRender.includes(activityRandom)) && (activityRandom.urlAttendance !== null)) {
      activitiesRender.push(activityRandom)
    } else {
      i--
    }
  }
  return (
    <>
        <h5>Activities random</h5>
      <div className='home-activities'>
        {activitiesRender.map((activity) => (
          <div key={activity.id} className="activity-random">
            <img src={activity.urlAttendance} />
            <span>{activity.name}</span>
            <p>{activity.group.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
export default Home
