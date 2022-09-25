import { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { openConfirmModal } from '@mantine/modals'
import { CSVLink } from 'react-csv'

import './ExportSurvey.scss'
import { Divider } from '@mantine/core'

const ExportSurvey = ({ questions }) => {
  const [month, setMonth] = useState()
  const csvRef = useRef()

  const questionChoose = questions.filter(
    (question) =>
      new Date(question.time).getMonth() == new Date(month).getMonth()
  )
  const header = [
    { label: 'Questions', key: 'groupName' },
    { label: 'Question One', key: 'answerOne' },
    { label: 'Question Two', key: 'answerTwo' },
    { label: 'Question Three', key: 'answerThree' },
  ]
  const fileQuestions = questionChoose?.map((question) => ({
    groupName: 'Group Answer',
    answerOne: question.questionOne,
    answerTwo: question.questionTwo,
    answerThree: question.questionThree,
  }))
  const fileAnswer =
    questionChoose[0]?.reports?.map((report) => ({
      groupName: report.group.name,
      answerOne: report.answerOne,
      answerTwo: report.answerTwo,
      answerThree: report.answerThree,
    })) || []
  const data = fileQuestions.concat(fileAnswer)
  const fileName = `Data${
    new Date(questionChoose[0]?.time).toLocaleString('default', {
      month: 'long',
    }) || ''
  }`

  const handleClick = () => {
    openConfirmModal({
      title: 'Are you sure want to Download?',
      labels: { confirm: 'Download', cancel: 'Cancel' },
      // confirmProps: { color: 'red' },
      onConfirm: () => csvRef.current.link.click(),
    })
  }
  return (
    <div className="export-wrapper" style={{ color: '#fff' }}>
      <div className="datepicker-month">
        <h2>Select Month To Export</h2>

        <DatePicker
          selected={month}
          onChange={(date) => setMonth(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          style={{ width: '50%' }}
        />
      </div>
      {questionChoose.length > 0 && (
        <div className="export-questions">
          <h3>
            {'Questions for' +
              ' ' +
              (new Date(questionChoose[0]?.time).getMonth() + 1) +
              '/' +
              new Date(questionChoose[0]?.time).getFullYear()}
          </h3>
          <p>{questionChoose[0]?.questionOne}</p>
          <p>{questionChoose[0]?.questionTwo}</p>
          <p>{questionChoose[0]?.questionThree}</p>
        </div>
      )}
      {fileAnswer.map((report, idx) => (
        <div key={idx} className="export-answers">
          <h4>{report.groupName}</h4>
          <p>{report.answerOne}</p>
          <p>{report.answerTwo}</p>
          <p>{report.answerThree}</p>
        </div>
      ))}
      <button
        className="btn-cyan"
        onClick={() => {
          handleClick()
        }}
      >
        Download <ion-icon name="cloud-download-outline"></ion-icon>
      </button>
      <CSVLink
        ref={csvRef}
        data={data}
        headers={header}
        filename={fileName || 'ResponeData'}
        asyncOnClick={true}
      ></CSVLink>
    </div>
  )
}

export default ExportSurvey
