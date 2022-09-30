import { Grid } from '@mantine/core'

import './ReportPortal.scss'

const ReportPortal = ({ reportsPortal }) => {
  return (
    <div className="reports-portal">
      <Grid grow >
        <Grid.Col span={4}>
          <div className="total-members">
            <span>{reportsPortal.totalMembers}</span>
            <p>Total <br/>Members</p>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-groups">
            <span>{reportsPortal.totalGroups}</span>
            <p>
              Total
              <br />
              Groups
            </p>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-activities">
            <span>{reportsPortal.totalMonthActivities}</span>
            <p>Total Activities Last Month</p>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-members">
            <span>{reportsPortal.totalMonthMembers}</span>
            <p>New Members Last 1 Month</p>
          </div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div className="total-month-groups">
            <span>{reportsPortal.totalMonthGroups}</span>
            <p>New Groups Last 1 Month</p>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default ReportPortal
