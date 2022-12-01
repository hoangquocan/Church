import { MetaTags } from '@redwoodjs/web'
import EditMemberCell from 'src/components/Member/EditMemberCell'
const EditMemberPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Edit Member" description="EditMember page" />
      <EditMemberCell id={id} />
    </>
  )
}

export default EditMemberPage
