import { Label, Form, FieldError } from '@redwoodjs/forms'
import SelectField from 'src/components/Form/SelectField/SelectField'
import DatePicker from '../../Form/DatePicker/DatePicker'
import Button from 'src/components/Form/Button/Button'
import { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import { navigate, routes } from '@redwoodjs/router'
import { QUERY as QUERY_GROUPS } from 'src/components/Group/GroupsCell'
import { Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import './ReportCreate.scss'

const QUERY_REPORT = gql`
  query ReportByGroupQuery($groupId: Int!) {
    reportByGroup(groupId: $groupId) {
      time
    }
  }
`
const ReportCreate = () => {
  const [value, setValue] = useState('')
  const [groupView, setGroupView] = useState({})
  const { handleSubmit, control } = useForm()
  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      return (didMount.current = true)
    }
    navigate(routes.reportInfo({ time: JSON.stringify(groupView) }))
  }, [groupView])

  const {
    loading: loadingG,
    error: errorG,
    data: dataG,
  } = useQuery(QUERY_GROUPS)
  // if (loadingG) return 'Loading Groups...!'
  // if (errorG) return `Error! ${errorG.message}`
  let groups = []
  if (dataG) {
    groups = dataG.groups
  }
  const dataSelect = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))
  const { loading, error, data } = useQuery(QUERY_REPORT, {
    skip: !value,
    variables: { groupId: value },
  })
  if (loading)
    return (
      <div style={{ textAlign: 'center' }}>
        <Loader variant="oval" size="md" color="blue" />
      </div>
    )
  if (error) return `Error! ${error.message}`
  let reportExist = []
  if (data) {
    reportExist = data.reportByGroup.map((item) => item.time)
  }

  const onSubmit = (input) => {
    const toDateView = new Date(input.toDate)
    const fromDateView = new Date(input.fromDate)

    const monthToView = new Date(input.toDate)
    const monthCompare = new Date(
      monthToView.setDate(monthToView.getDate() - 29)
    )

    const timeView = toDateView.getFullYear() + '-' + toDateView.getMonth()

    if (reportExist.includes(timeView)) {
      showNotification({
        color: 'red',
        title: 'Notification',
        message: 'This Month\'s Team Report Has Been Created!',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],

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
    } else if (
      fromDateView.getMonth() !== toDateView.getMonth() ||
      monthCompare < fromDateView
    ) {
      showNotification({
        color: 'red',
        title: 'Notification!',
        message: 'Please check the time select! (Within the same month and full 30 days)',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],

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
    } else {
      setGroupView(Object.assign(input, { groupId: value }))
    }
  }

  return (
    <div className="report-form">
      <h2 className="text-center">Create New Report</h2>
      <Form onSubmit={handleSubmit(onSubmit)} config={{ mode: 'onBlur' }}>
        <Label name="groupId">Group To View</Label>
        <SelectField value={value} onChange={setValue} data={dataSelect} />
        <FieldError name="groupId" />

        <Label name="fromDate">From Date</Label>
        <DatePicker
          name="fromDate"
          control={control}
          showTimeSelect
          dateFormat="yyyy/MM/dd hh:mm aa"
        />

        <div className="toDate">
          <Label name="toDate">To Date</Label>
          <DatePicker
            name="toDate"
            control={control}
            showTimeSelect
            dateFormat="yyyy/MM/dd hh:mm aa"
          />
        </div>
        <div className="form-btn">
          <Button btn_size="md">Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default ReportCreate
