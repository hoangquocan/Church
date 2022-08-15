import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import MembersCell from 'src/components/Member/MembersCell'

const MembersPage = ({ page = 1 }) => {
  return (
    <>
      <MetaTags title="Members" description="Members page" />
      <Link to={routes.newMember()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Member
        </Link>
      <MembersCell page={page}/>
    </>
  )
}

export default MembersPage
