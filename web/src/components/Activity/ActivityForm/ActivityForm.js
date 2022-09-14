import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { Label, Form, FieldError } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import SelectField from 'src/components/Form/SelectField/SelectField'
import DatePicker from 'src/components/Form/DatePicker/DatePicker'

import './ActivityForm.scss'

const CREATE_ACTIVITY = gql`
  mutation CreateActivityMutation($input: CreateActivityInput!) {
    createActivity(input: $input) {
      name
      date
      groupId
    }
  }
`
const ActivityForm = ({ groups }) => {
  const [value, setValue] = useState(null)
  const { handleSubmit, control } = useForm()
  const [createActivity, { loading, error }] = useMutation(CREATE_ACTIVITY, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Activity Has Been Created!',
        message: 'Leader can view and attendance it',
        // icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[7],

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
      navigate(routes.activities())
    },
  })
  const onSubmit = (input, data) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure create this activity?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () =>
        createActivity({
          variables: { input: { ...data, ...input, groupId: value } },
        }),
    })
  }

  const dataSelect = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))

  return (
    <div className="activity-form">
      <h2 className="text-center" style={{ marginBottom: '6px' }}>
        Add New Activity
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} config={{ mode: 'onBlur' }}>
        <Label name="name">Name</Label>
        <Input type="text" name="name" />
        <FieldError name="name" className="error" />

        <Label name="date" className="label-group">
          Date
        </Label>
        <DatePicker
          name="date"
          control={control}
          showTimeSelect
          dateFormat="yyyy/MM/dd hh:mm aa"
        />
        <FieldError name="date" className="error" />

        <Label name="groupId">Group Participate</Label>
        <SelectField onChange={setValue} data={dataSelect} />
        <FieldError name="groupId" />

        <div className="form-btn">
          <Button disable={loading} btn_size="large">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default ActivityForm
