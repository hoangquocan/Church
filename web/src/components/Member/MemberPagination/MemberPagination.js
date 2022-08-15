import { Link, routes } from '@redwoodjs/router'
import './MemberPagination.scss'

const MemberPagination = ({ count }) => {
  const MEMBERS_PER_PAGE = 5
  const items = []

  for (let i = 0; i < Math.ceil(count / MEMBERS_PER_PAGE); i++) {
    items.push(
      <li key={i}>
        <Link to={routes.members({ page: i + 1 })}>{i + 1}</Link>
      </li>
    )
  }
  return (
    <div className='pagination'>
      <h2>Page</h2>
      <ul>{items}</ul>
    </div>
  )
}

export default MemberPagination
