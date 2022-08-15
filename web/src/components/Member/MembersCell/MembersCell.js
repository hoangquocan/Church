import { Link, routes } from '@redwoodjs/router'
import Member from 'src/components/Member/Member'
import MemberPagination from 'src/components/Member/MemberPagination'

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

export const Success = ({ memberPage, count }) => {
  return (
    <>
      {memberPage.members.map((member) => (
        <Member key={member.id} member={member} />
      ))}
      <MemberPagination count={memberPage.count} />
    </>
  )
}
