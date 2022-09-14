import { Button, NumberInput, Textarea, Grid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { useEffect } from 'react'

import './ReportInfo.scss'
import { Month } from '@mantine/dates'

const CREATE_REPORT_MUTATION = gql`
  mutation CreateReportMutation($input: CreateReportInput!) {
    createReport(input: $input) {
      id
      groupId
      time
      totalActivity
      totalCompleted
      percentCompleted
      totalPresent
      totalAbsent
      percentPresent
      answerOne
      answerTwo
      answerThree
      comment
    }
  }
`
const QUERY_QUESTION = gql`
  query QuestionQuery($month: DateTime!) {
    questionByMonth(month: $month) {
      id
      time
      questionOne
      questionTwo
      questionThree
    }
  }
`

const ReportInfo = ({ activities, infoQuery }) => {
  const [createReport] = useMutation(CREATE_REPORT_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Thank You! Your Report Has Been Saved',
        // icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 3000,
        radius: 'md',
      })
      navigate(routes.reports())
    },
  })
  const month = new Date(
    new Date(new Date(infoQuery.toDate).setDate(1)).toDateString()
  )
  const { loading, error, data } = useQuery(QUERY_QUESTION, {
    skip: !month,
    variables: { month },
  })

  let questions = []
  if (data) {
    questions = data.questionByMonth
  }
  // console.log(month)
  // console.log(questions)
  // useEffect(() => {}, [infoQuery])
  const totalActivity = activities.length
  const activitiesCompleted = activities.filter(
    (item) => item.attendance.length > 0
  )
  const totalCompleted = activitiesCompleted.length
  const percentCompleted =
    +((totalCompleted / totalActivity) * 100).toFixed(2) || 0
  const attendances = activitiesCompleted.map((activity) => activity.attendance)
  const totalAttendanced = attendances.reduce(
    (sum, item) => sum + item.length,
    0
  )
  const totalPresent = attendances
    .map((item) => item.filter((i) => i.present == true))
    .flat().length
  const percentPresent =
    +((totalPresent / totalAttendanced) * 100).toFixed(2) || 0

  const totalAbsent = attendances
    .map((item) => item.filter((i) => i.present == false))
    .flat().length
  // const percentAbsent = +(totalAbsent / totalAttendanced).toFixed(2)
  const timeReport = new Date(infoQuery.toDate)

  const form = useForm({
    initialValues: {
      time: timeReport.getFullYear() + '-' + timeReport.getMonth(),
      totalActivity: totalActivity,
      totalCompleted: totalCompleted,
      percentCompleted: percentCompleted,
      totalPresent: totalPresent,
      totalAbsent: totalAbsent,
      percentPresent: percentPresent,
      comment: '',
    },
    validate: {
      comment: (value) =>
        value.length < 1 ? 'Please write your Comment!' : null,
    },
    clearInputErrorOnChange: true,
  })
  const handleSubmit = (values) => {
    openConfirmModal({
      title: ' Do you want to Save this Report?',
      children: <p>This report can not change on the future!!!</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () =>
        createReport({
          variables: { input: { ...values, groupId: infoQuery.groupId } },
        }),
    })
  }
  const {questionOne, questionTwo, questionThree} = questions
  return (
    <div className="reportinfo-wrapper">
      <h2 className="text-center">
        Report For Group {activities[0].group.name} -{' '}
        {timeReport.getMonth() + 1 + '/' + timeReport.getFullYear()}
      </h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter="xs">
          <Grid.Col span={4}>
            <NumberInput
              variant="unstyled"
              disabled
              label="Total Activities"
              hideControls
              {...form.getInputProps('totalActivity')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.orange[2],
                  borderRadius: '5px',
                  textAlign: 'center',
                },
                disabled: {
                  textAlign: 'center',
                  backgroundColor: 'white',
                  color: 'blue',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.4rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              disabled
              label="Total Completed"
              variant="unstyled"
              hideControls
              {...form.getInputProps('totalCompleted')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.orange[2],
                  textAlign: 'center',
                  borderRadius: '5px',
                },
                disabled: {
                  backgroundColor: 'white',
                  textAlign: 'center',
                  color: 'blue',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.4rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              disabled
              label="Percent Completed"
              variant="unstyled"
              hideControls
              precision={2}
              formatter={(value) => `${value} %`}
              {...form.getInputProps('percentCompleted')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.orange[2],
                  textAlign: 'center',
                  borderRadius: '5px',
                },
                disabled: {
                  backgroundColor: 'white',
                  textAlign: 'center',
                  color: 'blue',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.1rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter="xs">
          <Grid.Col span={4}>
            <NumberInput
              disabled
              variant="unstyled"
              label="Total Present"
              hideControls
              {...form.getInputProps('totalPresent')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.yellow[2],
                  textAlign: 'center',
                  borderRadius: '5px',
                },
                disabled: {
                  backgroundColor: 'white',
                  textAlign: 'center',
                  color: 'red',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.4rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              disabled
              variant="unstyled"
              label="Total Absent"
              hideControls
              {...form.getInputProps('totalAbsent')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.yellow[2],
                  textAlign: 'center',
                  borderRadius: '5px',
                },
                disabled: {
                  backgroundColor: 'white',
                  textAlign: 'center',
                  color: 'red',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.4rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              disabled
              variant="unstyled"
              label="Percent Present"
              hideControls
              precision={2}
              formatter={(value) => `${value} %`}
              {...form.getInputProps('percentPresent')}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.yellow[2],
                  textAlign: 'center',
                  borderRadius: '5px',
                },
                disabled: {
                  backgroundColor: 'white',
                  textAlign: 'center',
                  color: 'red',
                  fontSize: '1.8rem',
                  '@media (max-width: 600px)': {
                    fontSize: '1.1rem',
                  },
                },
                label: {
                  color: 'black',
                  fontSize: '1.2rem',
                  marginLeft: '0',
                  '@media (max-width: 600px)': {
                    fontSize: '1rem',
                  },
                },
              })}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          error
          label={questionOne}
          autosize
          minRows={3}
          {...form.getInputProps('comment')}
          // styles={() => ({
          //   root: {
          //     width: '100%',
          //   },
          // })}
        />
        <Textarea
          error
          label={questionTwo}
          autosize
          minRows={3}
          {...form.getInputProps('comment')}
          // styles={() => ({
          //   root: {
          //     width: '100%',
          //   },
          // })}
        />
        <Textarea
          error
          label={questionThree}
          autosize
          minRows={3}
          {...form.getInputProps('comment')}
          // styles={() => ({
          //   root: {
          //     width: '100%',
          //   },
          // })}
        />
        <Textarea
          error
          label="Write Your Comment About Last Month"
          autosize
          minRows={3}
          {...form.getInputProps('comment')}
          // styles={() => ({
          //   root: {
          //     width: '100%',
          //   },
          // })}
        />

        <div className="form-btn-mantine">
          <Button variant="unstyled" type="submit">
            Save Report <ion-icon name="checkmark-circle-outline"></ion-icon>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReportInfo
