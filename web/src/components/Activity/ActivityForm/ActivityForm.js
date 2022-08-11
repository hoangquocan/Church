import { Label, Form, FieldError, SelectField } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import DatePick from 'src/components/Form/DatePicker/DatePicker'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'
import './ActivityForm.scss'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm } from 'react-hook-form'

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
        <Input type="text" name="name" placeholder="Tên Hoạt Động" />
        <FieldError name="name" />
        <Label name="date" className="label-group">
          Date
        </Label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select Date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {/* <DatePick name="date" /> */}
        <FieldError name="date" />
        <Label name="group">Group Participate</Label>
        <SelectField
          name="groupId"
          defaultValue=""
          validation={{ valueAsNumber: true }}
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
        <FieldError name="group" />
        <Button disable={loading} btn_size="large">
          Save
        </Button>
      </Form>
    </div>
  )
}

export default ActivityForm
