import { MetaTags } from '@redwoodjs/web'
import ReportByGroupCell from 'src/components/Report/ReportByGroupCell'

const ReportInfoPage = ({ time }) => {
  const data = JSON.parse(time)
  return (
    <>
      <MetaTags title="ReportInfo" description="ReportInfo page" />

      <ReportByGroupCell timequery={data} />
    </>
  )
}

export default ReportInfoPage
