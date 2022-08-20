import { Link, routes } from "@redwoodjs/router"
import { toast, Toaster } from "@redwoodjs/web/dist/toast"
import { useMutation } from "@redwoodjs/web"
import { QUERY } from "../ActivitiesCell"

import './Activities.scss'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`
  const timeTag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toLocaleString('en-GB')}
      </time>
    )
  }
const Activities = ({ activities }) => {
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onComplete: () => {
      toast.success('Activity Deleted!')
    },
    refetchQueries: [{ query: QUERY}],
    awaitRefetchQueries: true,
  })

  const handleClick = (id, name)=> {
    if (confirm('Are you sure want to delete Activity ' + name + '?')) {
      deleteActivity({ variables: id })
    }
  }
  return (

    <div className="activities-wrapper">
      <Toaster />
      <header className="activities-header">
        <Link to={routes.activities()} className="rw-button rw-button-green">
          ACTIVITIES LIST
        </Link>
        <Link to={routes.newActivity()} className="rw-button rw-button-green">
        <ion-icon name="add-circle-outline"></ion-icon>New Activity
        </Link>
      </header>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Activity Name</th>
              <th>Date Participate</th>
              <th>Group Participate</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td></td>
                <td>{activity.name}</td>
                <td>{new Date(activity.date).toLocaleString( { timeZone: 'UTC' })}</td>
                <td>{activity.group.name}</td>
                <td>{timeTag(activity.createdAt)}</td>
                <td>
                  <nav className="activity-table-action">
                    <Link
                      to={routes.activity({id: activity.id})}
                      className="rw-button rw-button-small rw-button-blue"
                      title={'Show Activity ' + activity.name}
                    >
                      SHOW INFO
                    </Link>
                    <a
                      href="#"
                      onClick={() => handleClick(activity.id, activity.name)}
                      className="rw-button rw-button-small rw-button-red"
                      title={'Delete Activity ' + activity.name}
                    >
                      DELETE
                    </a>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Activities
