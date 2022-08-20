import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'

import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { useForm } from 'react-hook-form'

import { Label, Form, FieldError, SelectField } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
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
  const { handleSubmit, control } = useForm()
  const [createActivity, { loading, error }] = useMutation(CREATE_ACTIVITY, {
    onCompleted: () => {
      toast.success('Thank you! Activity Created')
      navigate(routes.activities())
    },
  })
  const onSubmit = (input, data) => {
    createActivity({ variables: { input: { ...data, ...input } } })
  }
  return (
    <div className="activity-form">
      <Form onSubmit={handleSubmit(onSubmit)} config={{ mode: 'onBlur' }}>
        <Label name="name">Name</Label>
        <Input type="text" name="name" />
        <FieldError name="name" className="error"/>

        <Label name="date" className="label-group">
          Date
        </Label>
        <DatePicker
          name="date"
          control={control}
          showTimeSelect
          dateFormat="yyyy/MM/dd hh:mm aa"
        />
        <FieldError name="date" className="error"/>

        <Label name="groupId">Group Participate</Label>

        <SelectField
          name="groupId"
          defaultValue=""
          validation={{ valueAsNumber: true }}
          required
        >
          <option value="" disabled hidden>
            Select One Group
          </option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </SelectField>

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
