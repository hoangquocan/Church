import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import QuestionsCell from 'src/components/Manager/QuestionsCell'

const ExportSurveyPage = () => {
  return (
    <>
      <MetaTags title="ExportSurvey" description="ExportSurvey page" />
      <QuestionsCell />
    </>
  )
}

export default ExportSurveyPage
