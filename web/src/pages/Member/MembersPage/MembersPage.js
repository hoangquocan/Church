import MembersLoad from 'src/components/Member/MembersLoad/MembersLoad'
import './MembersPage.scss'
import { MetaTags } from '@redwoodjs/web'

const MembersPage = () => {
  return (
    <div className="members-page__wrapper">
      <MetaTags title="Members" />
      <MembersLoad />
    </div>
  )
}

export default MembersPage
