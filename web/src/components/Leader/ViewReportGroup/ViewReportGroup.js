import { Divider } from '@mantine/core'

import './ViewReportGroup.scss'

const ViewReportGroup = ({ report, time }) => {
  const reportView = report[0]
  const timeReverse = time.split('-').reverse()
  timeReverse.splice(0, 1, +timeReverse[0] + 1)
  const timeReport = timeReverse.join('/')
  return (
    <div className="viewreport-wrapper">
      <div className="details">
        <div className="cards">
          <div className="cardname">
            {reportView.totalActivity}
            <p>Total Activities</p>
          </div>
          <ion-icon style={{ color: 'blue' }} name="flash-outline"></ion-icon>
        </div>
        <div className="cards">
          <div className="cardname">
            {reportView.totalAbsent}
            <p>Total Absent</p>
          </div>
          <ion-icon style={{ color: 'red' }} name="alert-outline"></ion-icon>
        </div>
        <div className="cards">
          <div className="cardname">
            {reportView.percentPresent} %
            <p>Present</p>
          </div>
          <ion-icon
            style={{ color: 'purple' }}
            name="eye-outline"
          ></ion-icon>
        </div>
      </div>
      <div className="viewquestion">
        <div className="viewreport-questionOne">
          <p>{reportView.question.questionOne}</p>
          <p>{reportView.answerOne}</p>
        </div>
        <div className="viewreport-questionTwo">
          <p>{reportView.question.questionTwo}</p>
          <p>{reportView.answerTwo}</p>
        </div>
        <div className="viewreport-questionThree">
          <p>{reportView.question.questionThree}</p>
          <p>{reportView.answerThree}</p>
        </div>
        <div className="comment">{reportView.comment}</div>
      </div>
      <Divider
        my="xs"
        label={
          <h4 style={{ textAlign: 'center', color: '#46e6fc' }}>
            Report By {timeReport}
          </h4>
        }
        labelPosition="center"
      />
    </div>
  )
}

export default ViewReportGroup
