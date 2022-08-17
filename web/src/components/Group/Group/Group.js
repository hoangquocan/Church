import { Link, routes } from '@redwoodjs/router'
import './Group.scss'

const Group = ({ group }) => {
  const totalMember = group.members.length
  return (
    <div className="group-wrapper">
      <Link
        to={routes.groupAddMem({ id: group.id })}
        className="rw-button rw-button-green"
      >
        Add Member To Group
      </Link>

      <div className="group-info">
        <h2>Group Name: {group.name}</h2>

        <h4>Leader: {group.leader}</h4>
        <h4>Total Member: {totalMember}</h4>
      </div>
    </div>
  )
}

export default Group
