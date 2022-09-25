import { ContextProvider } from "../Context/Context"
import { useAuth } from "@redwoodjs/auth"

const {isAuthenticated} = useAuth()

export const QUERY = gql`
  query FindContextQuery {
    groups: groups {
      id
      name

    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  console.log(groups)
  return <ContextProvider groups={groups}/>
}
