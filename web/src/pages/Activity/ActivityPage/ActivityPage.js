import { MetaTags } from '@redwoodjs/web'
import ActivityCell from 'src/components/Activity/ActivityCell'

const ActivityPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Activity" description="Activity page" />

      <ActivityCell id={id}/>
    </>
  )
}

export default ActivityPage
