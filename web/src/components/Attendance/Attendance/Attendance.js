import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Form, CheckboxField, Label } from '@redwoodjs/forms'
import Button from 'src/components/Form/Button'
import './Attendance.scss'
import { useEffect, useState } from 'react'

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
const Attendance = ({ activity }) => {
  const members = activity.group.members
  const result = members.map((member) => ({
    activityId: activity.id,
    memberId: member.id,
    present: false,
  }))
  const [checkedState, setCheckedState] = useState(
    new Array(members.length).fill(false)
  )

  const [createAttendance, { loading, error }] = useMutation(
    CREATE_ATTENDANCE,
    {
      onCompleted: () => {
        toast.success('Thank You! Attendance Submited')
        navigate(routes.attendance())
      },
    }
  )

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
    createAttendance({ variables: { input: result } })
  }

  return (
    <div className="attendance-wrapper">
      <Form onSubmit={() => onSubmit(result)} config={{ mode: 'onBlur' }}>
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
                  <Label name="present">Present</Label>
                  <CheckboxField
                    name="present[]"
                    checked={checkedState[index]}
                    value={checkedState[index]}
                    onChange={() => handleChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="form-btn">
          <Button disabled={loading} btn_size="md">
            SUBMIT
          </Button>
        </div>
      </Form>
    </div>
  )
}
export default Attendance
