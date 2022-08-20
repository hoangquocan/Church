import { Link, routes } from '@redwoodjs/router'
import './Group.scss'

const Group = ({ group }) => {
  const totalMember = group.members.length
  return (
    <div className="group-wrapper">
      <div className="group-info">
        <h2>Group Name: {group.name}</h2>

        <h4>Leader: {group.leader}</h4>
        <h4>Total Member: {totalMember}</h4>
        </div>
        <div className='group-addmem'>
          <Link
            to={routes.groupAddMem({ id: group.id })}
            className="rw-button rw-button-green"
          >
           <ion-icon name="person-add-outline"></ion-icon> Add Member To Group
          </Link>
      </div>
    </div>
  )
}

export default Group
