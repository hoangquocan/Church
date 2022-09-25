import { back } from '@redwoodjs/router'
import { Loader } from '@mantine/core'
import GroupAddMem from '../GroupAddMem'

export const QUERY = gql`
  query MemberNoGroupQuery {
    membersNoGroup {
      id
      name
      birthDate
      address
      phoneNumber
      email
      urlAvatar
      createdAt
    }
  }
`
export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '25%' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => {
  return (
    <>
      <h3 className="text-center" style={{ margin: '1rem' }}>
        All Members Added To Group!
      </h3>
      <button
        className="inline-button inline-button-blue"
        style={{ margin: '0 auto', border: 'none' }}
        onClick={() => back()}
      >
        <ion-icon
          style={{ padding: '5px', fontSize: '2rem' }}
          name="arrow-back-circle-outline"
        ></ion-icon>
        Go Back
      </button>
    </>
  )
}
export const Success = ({ membersNoGroup, id }) => {
  return <GroupAddMem members={membersNoGroup} id={id} />
}
