import NewMember from 'src/components/Member/NewMember/NewMember'
import { MetaTags } from '@redwoodjs/web'

const NewMemberPage = () => {
  return (
    <>
      <MetaTags title="New Member" />
      <NewMember />
    </>
  )
}

export default NewMemberPage
