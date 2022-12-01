import { MetaTags } from '@redwoodjs/web'
import CreateQuestion from 'src/components/Manager/CreateQuestion'

const CreateQuestionPage = () => {
  return (
    <>
      <MetaTags title="Create Questions" description="CreateQuestion page" />
      <CreateQuestion />
    </>
  )
}

export default CreateQuestionPage
