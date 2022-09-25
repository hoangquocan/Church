import ExportSurvey from '../ExportSurvey'
import { Loader } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query QuestionsQuery {
    questions {
      id
      time
      questionOne
      questionTwo
      questionThree
      reports {
        group {
          name
        }
        answerOne
        answerTwo
        answerThree
      }
      createdAt
    }
  }
`

export const Loading = () => (
  <div style={{ textAlign:'center', marginTop: '25%'}}>
    <Loader variant="oval" size="md" color="blue" />
  </div>
)

export const Empty = () => {
  return (
    <div className='text-center'>
      <h2>No Question Yet</h2>
      <Link to={routes.createQuestion()} style={{color: 'var(--color-link)', fontSize: '1.2rem', fontFamily: 'Dancing Script, cursive'}}>
        {'Create one?'}
      </Link>
    </div>
  )
}


export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ questions }) => {
  return <ExportSurvey questions={questions} />
}
