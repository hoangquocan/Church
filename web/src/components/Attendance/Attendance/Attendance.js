import { useMutation } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { PickerInline } from 'filestack-react'
import { showNotification } from '@mantine/notifications'
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
  const result = members.map((member) => ({
    activityId: activity.id,
    memberId: member.id,
    present: false,
  }))
  const [checkedState, setCheckedState] = useState(
    new Array(members.length).fill(false)
  )
  const [updateActivity, { error }] = useMutation(UPDATE_ACTIVITY)
  const [createAttendance, { loading }] = useMutation(CREATE_ATTENDANCE, {
    onCompleted: () => {
      showNotification({
        color: 'teal',
        title: 'Thank You! Your Result Has Been Saved',
        icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 3000,
        radius: 'lg',
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

  useEffect(() => {
    checkedState.map((item, index) =>
      item ? (result[index].present = item) : result[index].present
    )
  }, [checkedState])

  const onSubmit = (result) => {
    console.log(urlAttendance)
    if (urlAttendance == "") {
      return alert(' Please take one Picture!')
    }
    if (confirm('Are you sure?')) {
      createAttendance({ variables: { input: result } })
    }
    if (urlAttendance !== "") {
      updateActivity({
        variables: { id: activity.id, input: { urlAttendance } },
      })
    }
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
            onClick={() => setIsChoose(isChoose == false ? true : false)}
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
          <Button disabled={loading} btn_size="md">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default Attendance
