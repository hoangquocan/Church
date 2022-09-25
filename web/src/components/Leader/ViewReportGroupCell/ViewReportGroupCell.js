import ViewReportGroup from '../ViewReportGroup'
import { Loader } from '@mantine/core'

export const QUERY = gql`
  query ViewReportGroupQuery($groupId: Int, $time: String) {
    reportViewByGroup(groupId: $groupId, time: $time) {
      id
      time
      group {
        id
        name
      }
      totalActivity
      totalCompleted
      percentCompleted
      totalPresent
      totalAbsent
      percentPresent
      answerOne
      answerTwo
      answerThree
      comment
      question {
        id
        questionOne
        questionTwo
        questionThree
      }
    }
  }
`
export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)
export const Empty = () => <h3 className='text-center'>No report yet</h3>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ reportViewByGroup, time }) => {
  return <ViewReportGroup report={reportViewByGroup} time={time} />
}
