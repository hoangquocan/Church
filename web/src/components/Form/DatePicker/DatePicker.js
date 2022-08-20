import React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'
import { Controller } from 'react-hook-form'

const DatePicker = ({ name, control, showTimeSelect, dateFormat }) => {
  return (
   <div className="datepicker-wrapper">
      <div className='datepicker'>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <ReactDatePicker
              dateFormat={dateFormat}
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
      </div>
      <div className='datepicker-icon'><ion-icon name="calendar-outline"></ion-icon></div>
   </div>
  )
}

export default DatePicker
