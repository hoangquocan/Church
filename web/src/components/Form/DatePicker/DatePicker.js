import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'
import { Controller, useForm } from 'react-hook-form'

const DatePick = ({ name }) => {
  const {
    control,
    // formState: { errors }
  } = useForm()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          placeholderText="Select Date"
          onChange={(date) => field.onChange(date)}
          selected={field.value}
        />
      )}
    />
  )
}

export default DatePick
