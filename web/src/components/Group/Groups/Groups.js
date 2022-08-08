import { Link, routes } from "@redwoodjs/router"
import { toast, Toaster } from "@redwoodjs/web/dist/toast"
import { useMutation } from "@redwoodjs/web"
import { QUERY } from "../GroupsCell"

import './Groups.scss'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
  const timeTag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
      </time>
    )
  }
const Groups = ({ groups }) => {
  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onComplete: () => {
      toast.success('Group Deleted!')
    },
    refetchQueries: [{ query: QUERY}],
    awaitRefetchQueries: true,
  })

  const handleClick = (id, name)=> {
    if (confirm('Are you sure want to delete Group ' + name + '?')) {
      deleteGroup({ variables: id })
    }
  }
  return (

    <div className="groups-wrapper">
      <Toaster />
      <header className="groups-header">
        <Link to={routes.groups()} className="rw-button rw-button-green">
          GROUPS LIST
        </Link>
        <Link to={routes.newGroup()} className="rw-button rw-button-green">
        <span>+</span>  New Group
        </Link>
      </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Group Name</th>
              <th>Leader</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{group.leader}</td>
                <td>{timeTag(group.createdAt)}</td>
                <td>
                  <nav className="group-table-action">
                    <Link
                      to={routes.group({id: group.id})}
                      className="rw-button rw-button-small rw-button-blue"
                      title={'Show Group ' + group.name}
                    >
                      SHOW INFO
                    </Link>
                    <a
                      href="#"
                      onClick={() => handleClick(group.id, group.name)}
                      className="rw-button rw-button-small rw-button-red"
                      title={'Delete Group ' + group.name}
                    >
                      DELETE
                    </a>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      {/* </div> */}
    </div>
  )
}

export default Groups
