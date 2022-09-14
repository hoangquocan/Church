import { MetaTags } from '@redwoodjs/web'
import MembersCell from 'src/components/Member/MembersCell'
import MemberBirthDate from 'src/components/Member/MemberBirthDate'

import './MembersPage.scss'
const MembersPage = () => {
  return (
    <>
      <MetaTags title="Members" description="Members page" />
      <MembersCell />
      <MemberBirthDate />
      {/* <MembersCell /> */}
    </>
  )
}

export default MembersPage
