import { MetaTags } from '@redwoodjs/web'
import CreateQuestion from 'src/components/Manager/CreateQuestion'
const CreateQuestionPage = () => {
  return (
    <>
      <MetaTags title="CreateQuestion" description="CreateQuestion page" />

      <CreateQuestion />
    </>
  )
}

export default CreateQuestionPage
