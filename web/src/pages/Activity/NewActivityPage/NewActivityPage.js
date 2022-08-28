import { MetaTags } from '@redwoodjs/web'
import ActivityFormCell from 'src/components/Activity/ActivityFormCell'

const NewActivityPage = () => {
  return (
    <>
      <MetaTags title="NewActivity" description="NewActivity page" />
      <ActivityFormCell />
    </>
  )
}

export default NewActivityPage
