import { Link, routes } from '@redwoodjs/router'
import MemberPagination from 'src/components/Member/MemberPagination'
import Members from '../Members/Members'

export const QUERY = gql`
  query MembersQuery($page: Int) {
    memberPage(page: $page) {
      members {
        id
        name
        birthDate
        address
        phoneNumber
        email
        group {
          name
        }
        createdAt
      }
      count
    }
  }
`

export const beforeQuery = ({ page }) => {
  page = page ? parseInt(page, 10) : 1
  return { variables: { page } }
}

export const Loading = () => {
  return <h3 className="text-center">Loading...</h3>
}

export const Empty = () => {
  return (
    <div className="text-center">
      <h3>No members yet.</h3>
      <Link to={routes.newMember()} style={{ color: 'var(--color-link)' }}>
        {'Create one?'}
      </Link>
    </div>
  )
}
export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ memberPage }) => {
  return (
    <>
      <Members members={memberPage.members}/>
      <MemberPagination count={memberPage.count} />
    </>
  )
}
