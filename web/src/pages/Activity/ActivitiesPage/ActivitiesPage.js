import { MetaTags } from '@redwoodjs/web'
import ActivitiesCell from 'src/components/Activity/ActivitiesCell'
import MembersCell from 'src/components/Member/MembersCell'
const ActivitiesPage = () => {
  return (
    <>
      <MetaTags title="Activities" description="Activities page" />
     <ActivitiesCell />
    </>
  )
}

export default ActivitiesPage
