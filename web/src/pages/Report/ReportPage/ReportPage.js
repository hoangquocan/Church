import ReportCreate from 'src/components/Report/ReportCreate'
import { MetaTags } from '@redwoodjs/web'

const ReportPage = () => {
  return (
    <>
      <MetaTags title="Report" description="Report page" />

      <ReportCreate />
    </>
  )
}

export default ReportPage
