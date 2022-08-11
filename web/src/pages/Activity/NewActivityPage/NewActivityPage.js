import { MetaTags } from '@redwoodjs/web'
import ActivityFormCell from 'src/components/Activity/ActivityFormCell'
const NewActivityPage = () => {
  return (
    <>
      <MetaTags title="NewActivity" description="NewActivity page" />

      <h1 className='text-center'>ADD NEW ACTIVITY</h1>

      <ActivityFormCell />
    </>
  )
}

export default NewActivityPage
