import { Link, routes } from '@redwoodjs/router'
import Members from '../Members/Members'
import { Skeleton, Group } from '@mantine/core'

export const QUERY = gql`
  query MembersQuery {
    members {
      id
      name
      birthDate
      address
      phoneNumber
      email
      urlAvatar
      group {
        name
      }
      createdAt
    }
  }
`

export const Loading = () => {
  return (
    <>
        <Skeleton height={30} width="94%" mt={16} radius="xl" mr={20}/>
      <Group>
        <Skeleton height={40} width={40} circle mt={16} radius="xl" />
        <Skeleton height={40} width="88%" mt={16} radius="xl" />
      </Group>
      <Group>
        <Skeleton height={40} width={40} circle mt={16} radius="xl" />
        <Skeleton height={40} width="88%" mt={16} radius="xl" />
      </Group>
      <Group>
        <Skeleton height={40} width={40} circle mt={16} radius="xl" />
        <Skeleton height={40} width="88%" mt={16} radius="xl" />
      </Group>
      <Group>
        <Skeleton height={40} width={40} circle mt={16} radius="xl" />
        <Skeleton height={40} width="88%" mt={16} radius="xl" />
      </Group>
      <Group>
        <Skeleton height={40} width={40} circle mt={16} radius="xl" />
        <Skeleton height={40} width="88%" mt={16} radius="xl" />
      </Group>
    </>
  )
}

export const Empty = () => {
  return (
    <div className="text-center" >
      <h2>No Member Yet</h2>
      <Link to={routes.newMember()} style={{ color: 'var(--color-link)', fontSize: '1.2rem', fontFamily: 'Dancing Script, cursive' }}>
        {'Create one?'}
      </Link>
    </div>
  )
}
export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ members }) => {
  return <Members members={members} />
}
