import ActivityForm from 'src/components/Activity/ActivityForm'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query Groups_query {
    groups {
      id
      name
      leader{
        name
        email
      }
    }
  }
`
export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="dark" />
  </div>
)
export const Empty = () => <h2 style={{ margin: '30px auto', textAlign: 'center', fontFamily: 'Lobster two', fontWeight: '300'}}>Please Create One Group To Participate</h2>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  return <ActivityForm groups={groups} />
}
