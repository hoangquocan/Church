import Member from "../Member/Member"

export const QUERY = gql`
  query FindMemberQuery($id: Int!) {
     member(id: $id) {
      id
      name
      birthDate
      email
      phoneNumber
      address
      urlAvatar
      group {
        name
      }
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ member }) => {
  return <Member member={member} />
}
