import ReportCreate from 'src/components/Report/ReportCreate'
import { MetaTags } from '@redwoodjs/web'

const ReportCreatePage = () => {
  return (
    <>
      <MetaTags title="ReportCreate" description="ReportCreate page" />

      <ReportCreate />
    </>
  )
}

export default ReportCreatePage
