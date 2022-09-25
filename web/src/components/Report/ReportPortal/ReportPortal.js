import { Grid } from '@mantine/core'

import './ReportPortal.scss'

const ReportPortal = ({ reportsPortal }) => {
  return (
    <div className="reports-portal">
      <Grid grow >
        <Grid.Col span={4}>
          <div className="total-members">
            <p>Total <br/>Members</p>
            <span>{reportsPortal.totalMembers}</span>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-groups">
            <p>
              Total
              <br />
              Groups
            </p>
            <span>{reportsPortal.totalGroups}</span>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-activities">
            <p>Total Activities Last Month</p>
            <span>{reportsPortal.totalMonthActivities}</span>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-members">
            <p>New Members Last 1 Month</p>
            <span>{reportsPortal.totalMonthMembers}</span>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-groups">
            <p>New Groups Last 1 Month</p>
            <span>{reportsPortal.totalMonthGroups}</span>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default ReportPortal
