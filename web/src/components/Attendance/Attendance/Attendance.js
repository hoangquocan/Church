import { useMutation } from '@redwoodjs/web'
import { useState, useMemo } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { PickerInline } from 'filestack-react'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { Form, CheckboxField, Label, FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Form/Button'
import './Attendance.scss'

const CREATE_ATTENDANCE = gql`
  mutation CreateManyAttendanceMutation($input: [CreateAttendanceInput!]!) {
    createManyAttendance(input: $input) {
      attendances {
        activityId
        memberId
        present
      }
    }
  }
`
const UPDATE_ACTIVITY = gql`
  mutation UpdateActivityMutation($id: Int!, $input: UpdateActivityInput!) {
    updateActivity(id: $id, input: $input) {
      id
      urlAttendance
    }
  }
`
const Attendance = ({ activity }) => {
  const [urlAttendance, setUrlAttendance] = useState('')
  const [isChoose, setIsChoose] = useState(false)
  const [nameAttendance, setNameAttendance] = useState('')

  const members = activity.group.members
  const [checkedState, setCheckedState] = useState(
    new Array(members.length).fill(false)
  )

  const [updateActivity, { error }] = useMutation(UPDATE_ACTIVITY)
  const [createAttendance, { loading }] = useMutation(CREATE_ATTENDANCE, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Thank You! Your Result Has Been Saved',
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
      navigate(routes.attendance())
    },
  })

  const handleChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const result = useMemo(() => {
    const resultPresent = members.map((member) => ({
      activityId: activity.id,
      memberId: member.id,
      present: false,
    }))
    checkedState.map((item, index) =>
      item
        ? (resultPresent[index].present = item)
        : resultPresent[index].present
    )
    return resultPresent
  }, [checkedState])

  const onSubmit = (result) => {
    if (urlAttendance == '') {
      return showNotification({
        color: 'red',
        title: 'Notification',
        message: 'Please Take One Picture Describing The Activity!',
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
    }
    if (urlAttendance !== '') {
      updateActivity({
        variables: { id: activity.id, input: { urlAttendance } },
      })
    }
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure create this activity?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () =>
      createAttendance({ variables: { input: result } }),
    })
    // if (confirm('Are you sure?')) {
    //   // console.log(result)
    //   createAttendance({ variables: { input: result } })
    // }
  }
  const onFileUpload = (response) => {
    setUrlAttendance(response.filesUploaded[0].url)
    setNameAttendance(response.filesUploaded[0].filename)
  }
  const handleImg = () => {
    setUrlAttendance(null)
    setNameAttendance(null)
  }
  return (
    <div className="attendance-wrapper">
      <Form
        onSubmit={() => onSubmit(result, urlAttendance)}
        config={{ mode: 'onBlur' }}
      >
        <table>
          <thead>
            <tr>
              <th>Tên Hoạt Động</th>
              <th>{activity.name}</th>
            </tr>
            <tr>
              <th>Nhóm Tham Gia</th>
              <th>{activity.group.name}</th>
            </tr>
          </thead>
          <tbody>
            {activity.group.members.map((member, index) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td className="attendance-box">
                  <span>Present</span>
                  <CheckboxField
                    name="present"
                    checked={checkedState[index]}
                    value={checkedState[index]}
                    onChange={() => handleChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Label name="urlAttendance">
          Picture<span> (Take a picture of your activity )</span>
        </Label>
        <div className="attendance-imgpicker">
          <input
            name="urlAttendance"
            type="button"
            onClick={() => setIsChoose(!isChoose)}
            value={nameAttendance}
            required={true}
          />
          <ion-icon name="image-outline"></ion-icon>
        </div>
        <FieldError name="urlAttendance" />
        {isChoose && (
          <PickerInline
            apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
            onSuccess={onFileUpload}
          >
            <div
              style={{
                display: urlAttendance ? 'none' : 'block',
                height: '300px',
              }}
            ></div>
          </PickerInline>
        )}
        {urlAttendance && (
          <div className="attendance-img">
            <img src={urlAttendance} />
            <input type="button" onClick={handleImg} value="Replace Picture" />
          </div>
        )}
        <div className="form-btn">
          <Button disabled={loading} btn_size="large">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default Attendance
