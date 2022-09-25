import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import QuestionsViewCell from 'src/components/Manager/QuestionsViewCell'

const QuestionsPage = () => {
  return (
    <>
      <MetaTags title="Questions" description="Questions page" />
      <QuestionsViewCell />
    </>
  )
}

export default QuestionsPage
