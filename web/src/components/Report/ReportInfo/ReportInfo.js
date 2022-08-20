import { useQuery } from '@redwoodjs/web'

const ReportInfo = ({ activities }) => {
  // const QUERY = gql`
  //   query ReportByGroupQuery(
  //     $groupId: Int!
  //     $fromDate: DateTime!
  //     $toDate: DateTime!
  //   ) {
  //     activities: activityInGroupByDate(
  //       groupId: $groupId
  //       fromDate: $fromDate
  //       toDate: $toDate
  //     ) {
  //       name
  //       attendance {
  //         present
  //       }
  //     }
  //   }
  // `

  // const { loading, error, data } = useQuery(QUERY, {
  //   variables: { groupView },
  // })
  // if (loading) return <h1 className="text-center">Loading...</h1>
  // if (error) return `Error! ${error.message}`
  return (
    <div>
      {activities.map((activity) => (
        <h1>{activity.name}</h1>
      ))}
    </div>
  )
}

export default ReportInfo
