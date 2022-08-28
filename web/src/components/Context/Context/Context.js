import { createContext } from 'react'
import { QUERY } from 'src/components/Activity/ActivitiesCell'
import { useQuery } from '@redwoodjs/web'
const Context = createContext()

const ContextProvider = ({ children }) => {
  // const { loading, error, data } = useQuery(QUERY)
  // if (loading) return <h1 className="text-center">Loading...</h1>
  // if (error) return `Error! ${error.message}`
  const activities = data.activities
  const totalActivities = activities.length

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
    <Context.Provider value={activitiesRender}>{children}</Context.Provider>
  )
}

export { Context, ContextProvider }
