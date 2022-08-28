import { Label, Form, FieldError } from '@redwoodjs/forms'
import SelectField from 'src/components/Form/SelectField/SelectField'
import DatePicker from '../../Form/DatePicker/DatePicker'
import Button from 'src/components/Form/Button/Button'
import { QUERY } from 'src/components/Group/GroupsCell'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

import './Report.scss'
import { navigate, routes } from '@redwoodjs/router'

const Report = () => {
  const [value, setValue] = useState(null)
  const [groupView, setGroupView] = useState({})
  const { handleSubmit, control } = useForm({
    initialValues: value,
  })
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      return (didMount.current = true)
    }
    navigate(routes.reportInfo({ variables: JSON.stringify(groupView) }))
  }, [groupView])

  const { loading, error, data } = useQuery(QUERY)
  if (loading) return <h1 className="text-center">Loading...</h1>
  if (error) return `Error! ${error.message}`

  const dataSelect = data.groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))
  const onSubmit = (input, data) => {
    setGroupView(Object.assign(data, {...input }, {groupId: value}))
  }

  console.log('render')

  return (
    <div className="report-form">
      <Form onSubmit={handleSubmit(onSubmit)} config={{ mode: 'onBlur' }}>
        <Label name="groupId">Group To View</Label>
        <SelectField value={value} onChange={setValue} data={dataSelect} />
        <FieldError name="groupId" />

        <Label name="fromDate">From Date</Label>
        <DatePicker name="fromDate" control={control} dateFormat="yyyy/MM/dd" />

        <Label name="toDate">To Date</Label>
        <DatePicker name="toDate" control={control} dateFormat="yyyy/MM/dd" />

        <div className="form-btn">
          <Button disable={loading} btn_size="md">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Report
