import { useState, useContext } from 'react'
import { DateRangePicker } from '@mantine/dates'

import SelectField from 'src/components/Form/SelectField/SelectField'
import { RefContext } from 'src/components/Context/Context'
import ViewAttendancedCell from 'src/components/Attendance/ViewAttendancedCell'
import './SelectViewAttendanced.scss'


const SelectViewAttendanced = () => {
  const [groupId, setGroupId] = useState('')
  const [value, setValue] = useState([new Date(), new Date()])
  const { groups } = useContext(RefContext)
  const [view, setView] = useState(false)

  const dataSelect = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))
  const handleView = (values) => {
    setView(true)
  }
  // console.log((new Date(value[0])))
  // console.log(value)
  return (
    <div className="viewAttendanced-wrapper">
       <div className='viewAttendanced-select'>
          <DateRangePicker
            label="Select Dates Range To View"
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
            fs="md"
          />
          <SelectField mb={24} label="Select group"value={groupId} onChange={setGroupId} data={dataSelect} />
          <button className="btn-cyan" type="button" onClick={handleView}>
            Submit
          </button>
       </div>
      {view && (
        <ViewAttendancedCell
          groupId={+groupId}
          fromDate={new Date(value[0])}
          toDate={
            new Date(
              new Date(value[1]).setDate(new Date(value[1]).getDate() + 1)
            )
          }
        />
      )}
    </div>
  )
}

export default SelectViewAttendanced
