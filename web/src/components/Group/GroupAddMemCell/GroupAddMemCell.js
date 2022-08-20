import { back } from '@redwoodjs/router'
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
      createdAt
    }
  }
`

export const Empty = () => {
  return (
    <>
      <h2 className="text-center">All Members Added To Group!</h2>
      <button className="rw-button" style={{margin: "auto"}} onClick={() => back()}>Go Back</button>
    </>
  )
}
export const Success = ({ membersNoGroup, id }) => {

  return (
    <GroupAddMem members={membersNoGroup} id={id}/>
  )
}
