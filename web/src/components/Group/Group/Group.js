import './Group.scss'

const Group = ({ group }) => {
  const totalMember = group.members.length
  return (
    <div className="group-wrapper">
      <div className="group-info">
        <h3><span>{group.name}</span></h3>
        <h4><span>{group.id}</span>Group Id</h4>
        <h4><span>{group.leader?.name || group.leader?.email || ''}</span>Leader</h4>
        <h4><span>{totalMember}</span>Total Member</h4>
      </div>
    </div>
  )
}

export default Group
