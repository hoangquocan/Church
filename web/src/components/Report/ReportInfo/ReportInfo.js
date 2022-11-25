import { Button, NumberInput, Textarea, Grid } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { useEffect } from 'react'

import './ReportInfo.scss'
// import 'src/components/Member/MemberForm/MemberForm.scss'

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
      questionId
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
        title: 'Done! Your Report Has Been Saved',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[9],
            backgroundColor: theme.colors.blue[2],
            '&::before': { backgroundColor: theme.blue },
          },

          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
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
      answerOne: '',
      answerTwo: '',
      answerThree: '',
      comment: '',
    },
    validate: {
      comment: (value) =>
        value.length < 10 ? 'Please write your Comment!' : null,
      answerOne: (value) =>
        value.length < 10 ? 'Please write your Answer One!' : null,
      answerTwo: (value) =>
        value.length < 10 ? 'Please write your Answer Two!' : null,
      answerThree: (value) =>
        value.length < 10 ? 'Please write your Answer Three!' : null,
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
          variables: { input: { ...values, groupId: infoQuery.groupId, questionId: id } },
        }),
    })
  }
  const { id, questionOne, questionTwo, questionThree } = questions || ''

  return (
    <>
      <h2 className="text-center">
        Report For Group {activities[0].group.name} -{' '}
        {timeReport.getMonth() + 1 + '/' + timeReport.getFullYear()}
      </h2>
      <div className="reportinfo-wrapper">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter="md">
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
                    '@media (max-width: 768px)': {
                      fontSize: '16px',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.6rem',
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
                    '@media (max-width: 768px)': {
                      fontSize: '1.4rem',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.6rem',
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
                    '@media (max-width: 768px)': {
                      fontSize: '1.1rem',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.6rem',
                    },
                  },
                })}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="md" mt="10px">
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
                    '@media (max-width: 768px)': {
                      fontSize: '1.4rem',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.8rem',
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
                    '@media (max-width: 768px)': {
                      fontSize: '1.4rem',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.8rem',
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
                    '@media (max-width: 768px)': {
                      fontSize: '1.1rem',
                    },
                  },
                  label: {
                    color: 'black',
                    fontSize: '1.2rem',
                    marginLeft: '0',
                    '@media (max-width: 768px)': {
                      fontSize: '0.8rem',
                    },
                  },
                })}
              />
            </Grid.Col>
          </Grid>
          <Textarea
            label={questionOne}
            autosize
            mt={30}
            minRows={3}
            {...form.getInputProps('answerOne')}
            styles={() => ({
              label: {
                color: 'white',
              },
            })}
          />
          <Textarea
            label={questionTwo}
            autosize
            mt={30}
            minRows={3}
            {...form.getInputProps('answerTwo')}
            styles={() => ({
              label: {
                color: 'white',
              },
            })}
          />
          <Textarea
            label={questionThree}
            autosize
            mt={30}
            minRows={3}
            {...form.getInputProps('answerThree')}
            styles={() => ({
              label: {
                color: 'white',
              },
            })}
          />
          <Textarea
            label="Write Your Comment About Last Month"
            autosize
            mt={30}
            minRows={3}
            {...form.getInputProps('comment')}
            styles={() => ({
              label: {
                color: 'white',
              },
            })}
          />

          <div className="form-btn">
            <Button variant="unstyled" type="submit">
              Save <ion-icon name="checkmark-circle-outline"></ion-icon>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ReportInfo
