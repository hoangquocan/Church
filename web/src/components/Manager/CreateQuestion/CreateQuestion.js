import { Button, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'

import './CreateQuestion.scss'
import 'src/components/Member/MemberForm/MemberForm.scss'
import '../ExportSurvey/ExportSurvey.scss'

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      time
      questionOne
      questionTwo
      questionThree
    }
  }
`
const CreateQuestion = () => {
  const [monthSelect, setMonthSelect] = useState()
  const [createQuestion, { loading, error }] = useMutation(
    CREATE_QUESTION_MUTATION,
    {
      onCompleted: () => {
        showNotification({
          color: 'blue',
          title: 'Done! Your Survey Has Been Saved',
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
        form.reset()
      },
      onError: () => {
        showNotification({
          color: 'red',
          title: 'Notification!',
          message:
            'Please check your Survey if it has been created on that month',
          rd: 'md',
          autoClose: false,
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.red[7],
              backgroundColor: theme.colors.red[1],
              '&::before': { backgroundColor: theme.red },
            },

            title: { color: theme.colors.red[5] },
            closeButton: {
              color: theme.colors.gray[7],
              '&:hover': {
                color: theme.white,
                backgroundColor: theme.colors.gray[6],
              },
            },
          }),
        })
      },
    }
  )
  const form = useForm({
    initialValues: {
      questionOne: '',
      questionTwo: '',
      questionThree: '',
    },
    validate: {
      questionOne: (value) =>
        value.length < 10 ? 'Please write for Question One' : null,
      questionTwo: (value) =>
        value.length < 10 ? 'Please write for Question Two' : null,
      questionThree: (value) =>
        value.length < 10 ? 'Please write for Question Three' : null,
    },
  })
  const handleSubmit = (values) => {
    openConfirmModal({
      title: ' Do you want to Save these Questions?',
      children: (
        <p>
          If you want create new one on the same Month, please delete before or
          you can update it!!!
        </p>
      ),
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () =>
        createQuestion({
          variables: { input: { ...values, time: monthSelect } },
        }),
    })

    setMonthSelect()
  }

  return (
    <div className="member-form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="datepicker-month">
          {/* <h3 style={{margin: '20px'}} className='text-center'>Select Month To Create </h3> */}
          <DatePicker
            selected={monthSelect}
            onChange={(date) => setMonthSelect(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            popperPlacement="bottom"
            placeholderText="Select Month To Create"
          />
        </div>
        <Textarea
          label="Question One"
          autosize
          minRows={3}
          autoFocus
          {...form.getInputProps('questionOne')}
        />
        <Textarea
          label="Question Two"
          autosize
          minRows={3}
          {...form.getInputProps('questionTwo')}
        />
        <Textarea
          label="Question Three"
          autosize
          minRows={3}
          {...form.getInputProps('questionThree')}
        />
        <div className="form-btn">
          <Button variant="unstyled" type="submit">
            Save<ion-icon name="checkmark-circle-outline"></ion-icon>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuestion
