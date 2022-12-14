import { Link, routes } from '@redwoodjs/router'
import Members from 'src/components/Member/Members/Members'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query GroupMembersQuery($id: Int!) {
    group(id: $id) {
      id
      members {
        id
        name
        email
        birthDate
        phoneNumber
        address
        urlAvatar
        group {
          name
          id
        }
        groupId
      }
    }
  }
`
export const Failure = ({ error }) => {
  return <div style={{ color: 'red' }}>Error: {error.message}</div>
}

export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => {
  return (
    <div className="text-center">
      <h3>No Groups Yet</h3>
      <Link to={routes.newGroup()} style={{ color: 'var(--color-link)' }}>
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ group }) => {
  if (group.members.length == 0) {
    return <h3 className='text-center'>No Member Of Group</h3>
  }
  return <Members groupId={group.id} members={group.members} isGroup={true} />
}
