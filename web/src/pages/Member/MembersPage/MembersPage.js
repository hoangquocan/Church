import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import MembersCell from 'src/components/Member/MembersCell'

import './MembersPage.scss'
const MembersPage = ({ page = 1 }) => {
  return (
    <>
      <MetaTags title="Members" description="Members page" />
      <div className='members-link'>
        <Link to={routes.newMember()} className="rw-button rw-button-green">
        <ion-icon name="person-add-outline"></ion-icon>New Member
          </Link>
      </div>
      <MembersCell page={page}/>
    </>
  )
}

export default MembersPage
