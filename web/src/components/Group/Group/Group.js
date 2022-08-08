import { Link, routes } from '@redwoodjs/router'
import './Group.scss'

const Group = ({ group }) => {
  return (
    <div>
      <div className="group-wrapper">
        <Link
          to={routes.groupAddMem({ id: group.id })}
          className="rw-button rw-button-green"
        >
          Add Member To Group
        </Link>

        <h2>Group Name: {group.name}</h2>

        <p>Leader: {group.leader}</p>
      </div>
    </div>
  )
}

export default Group
