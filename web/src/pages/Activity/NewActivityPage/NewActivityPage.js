import { MetaTags } from '@redwoodjs/web'
import ActivityFormCell from 'src/components/Activity/ActivityFormCell'

const NewActivityPage = () => {
  return (
    <>
      <MetaTags title="New Activity" description="New Activity page" />
      <ActivityFormCell />
    </>
  )
}

export default NewActivityPage
