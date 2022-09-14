import { Link, routes } from '@redwoodjs/router'
import { Loader } from '@mantine/core'
import Groups from 'src/components/Group/Groups'

export const QUERY = gql`
  query GROUPS {
    groups {
      id
      name
      leader{
        id
        name
        email
        avatar
      }
      userId
      createdAt
    }
  }
`
export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => {
  return (
    <div className='text-center'>
      <h2>No Group Yet</h2>
      <Link to={routes.newGroup()} style={{color: 'var(--color-link)', fontSize: '1.2rem', fontFamily: 'Dancing Script, cursive'}}>
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ groups }) => {
  return (
    <Groups groups={groups}/>
  )
}
