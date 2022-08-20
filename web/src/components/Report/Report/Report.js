import { Label, Form, FieldError, SelectField } from '@redwoodjs/forms'
import DatePicker from '../../Form/DatePicker/DatePicker'
import Button from 'src/components/Form/Button/Button'
import { QUERY } from 'src/components/Group/GroupsCell'

import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

import './Report.scss'
import { navigate, routes } from '@redwoodjs/router'

const Report = () => {
  const [groupView, setGroupView] = useState({})
  const { handleSubmit, control } = useForm()
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

  const onSubmit = (input, data) => {
    setGroupView({ ...data, ...input })
  }

  return (
    <div className="report-form">
      <Form onSubmit={handleSubmit(onSubmit)} config={{ mode: 'onBlur' }}>
        <Label name="groupId">Group To View</Label>
        <SelectField
          name="groupId"
          defaultValue=""
          validation={{ valueAsNumber: true }}
          required
        >
          <option value="" disabled hidden>
            Select One Group
          </option>
          {data.groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </SelectField>
        <FieldError name="groupId" />

        <Label name="fromDate">From Date</Label>
        <DatePicker name="fromDate" control={control} dateFormat="yyyy/MM/dd" />

        <Label name="toDate">To Date</Label>
        <DatePicker name="toDate" control={control} dateFormat="yyyy/MM/dd" />

        <div className="form-btn">
          <Button disable={loading} btn_size="md">
            Save
          </Button>
        </div>
      </Form>
      {/* {(groupView != null) ? <ReportInfo groupView={groupView}/> : <ReportInfo hiden="hiden"/>} */}
    </div>
  )
}

export default Report
