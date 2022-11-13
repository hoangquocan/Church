import { Loader } from '@mantine/core'
import ManagerQuarter from '../ManagerQuarter/ManagerQuarter'


export const QUERY = gql`
  query FindActivitiesQuarter($month: Int!, $year: Int!) {
     activitiesQuarter(month: $month, year: $year) {
      id
      name
      date
      groupId
      group {
        id
        name
      }
      attendance{
        id
        present
      }
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => <h2 className='text-center'>No Activity Yet</h2>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Please select quarter to view!</div>
)

export const Success = ({ activitiesQuarter }) => {
  return <ManagerQuarter activities={activitiesQuarter}/>
}
