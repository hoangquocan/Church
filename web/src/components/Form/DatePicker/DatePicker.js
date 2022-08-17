import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'
import { Controller } from 'react-hook-form'

const DatePicker = ({ name, control, showTimeSelect, dateFormat }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactDatePicker
          dateFormat={dateFormat}
          placeholderText="Select Date"
          onChange={(date) => field.onChange(date)}
          selected={field.value}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          showTimeSelect={showTimeSelect}
          className="datepicker"
        />
      )}
    />
  )
}

export default DatePicker
