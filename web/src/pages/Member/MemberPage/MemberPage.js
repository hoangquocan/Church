import { MetaTags } from '@redwoodjs/web'
import MemberCell from 'src/components/Member/MemberCell'

const MemberPage = ({id}) => {
  return (
    <>
      {/* <MetaTags title="Member" description="Member page" /> */}

      <MemberCell id={id}/>
    </>
  )
}

export default MemberPage
