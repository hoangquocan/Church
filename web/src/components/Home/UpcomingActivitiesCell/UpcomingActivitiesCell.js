import { Loader } from '@mantine/core'

import UpcomingActivities from '../UpcomingActivities'

export const QUERY = gql`
  query UpcomingActivitiesQuery($groupId: Int, $time: DateTime!) {
    upcomingActivities(groupId: $groupId, time: $time) {
      id
      name
      date
      group {
        id
        name
        leader {
          email
        }
        members {
          id
          name
          email
        }
      }
      groupId
    }
  }
`
export const beforeQuery = ({ groupId, time }) => {

  return { variables: { groupId: groupId, time} }
}

export const Loading = () => (
  <div style={{ textAlign: 'center', marginTop: '10%' }}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => (
  <h2 className="text-center">
    Your group has not yet initiated an upcoming activity
  </h2>
)

export const Failure = ({ error }) => (
  <div></div>
)

export const Success = ({ upcomingActivities }) => {
  return <UpcomingActivities upcomingActivities={upcomingActivities} />
}
