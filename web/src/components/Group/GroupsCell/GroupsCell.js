import { Link, routes } from '@redwoodjs/router'
import Groups from 'src/components/Group/Groups'

export const QUERY = gql`
  query GROUPS {
    groups {
      id
      name
      leader
      createdAt
    }
  }
`
export const Loading = () => {
return (<h3 className='text-center'>Loading...</h3>)}

export const Empty = () => {
  return (
    <div className='text-center'>
      <h3>No Groups Yet</h3>
      <Link to={routes.newGroup()} style={{color: 'var(--color-link)'}}>
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
