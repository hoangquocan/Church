import { MetaTags } from '@redwoodjs/web'
import MembersCell from 'src/components/Member/MembersCell'
import MemberBirthDate from 'src/components/Member/MemberBirthDate'
import MembersLoadCell from 'src/components/Member/MembersLoadCell'
import { useState } from "react"
import './MembersPage.scss'
import MembersLoad from 'src/components/Member/MembersLoad/MembersLoad'
const MembersPage = () => {
  // const [loadMembers, setLoadMembers] =useState(1)
  // const handleLoadMembers = () => {
  //   setLoadMembers(prev => prev + 1)
  // }

  return (
    <div className='members-page__wrapper'>
      <MetaTags title="Members" description="Members page" />
      {/* <MembersLoadCell load={loadMembers} handleLoadMembers={handleLoadMembers}/> */}
      {/* <button onClick={handleLoadMembers}>Load More</button> */}
      {/* <MembersCell />*/}
      {/* <MemberBirthDate /> */}
      <MembersLoad />
    </div>
  )
}

export default MembersPage
