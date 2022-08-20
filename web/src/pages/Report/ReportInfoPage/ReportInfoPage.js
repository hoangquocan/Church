import { MetaTags } from '@redwoodjs/web'
import ReportByGroupCell from 'src/components/Report/ReportByGroupCell'

const ReportInfoPage = ({ variables }) => {
  const data = JSON.parse(variables)
  return (
    <>
      <MetaTags title="ReportInfo" description="ReportInfo page" />

      <ReportByGroupCell variables={data} />
    </>
  )
}

export default ReportInfoPage
