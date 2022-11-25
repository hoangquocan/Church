import { useMutation } from '@redwoodjs/web'
import { useState, useMemo, useRef } from 'react'
import { PickerInline } from 'filestack-react'
import {navigate, routes} from '@redwoodjs/router'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { Form } from '@redwoodjs/forms'

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
const Attendance = ({ activity, handleModal }) => {
  const [urlAttendance, setUrlAttendance] = useState('')
  const [isChoose, setIsChoose] = useState(false)
  const [nameAttendance, setNameAttendance] = useState('')

  const members = activity.group?.members
  const groupId = activity.group.id
  const [checkedState, setCheckedState] = useState(
    new Array(members.length).fill(false)
  )

  const checkAllRef = useRef()
  const [updateActivity, { error }] = useMutation(UPDATE_ACTIVITY)
  const [createAttendance, { loading }] = useMutation(CREATE_ATTENDANCE, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! Your Result Has Been Saved',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[9],
            backgroundColor: theme.colors.blue[2],
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
      }),
        navigate(routes.activity({id: activity.id}))
        // handleModal()
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
    // if (urlAttendance == '') {
    //   return showNotification({
    //     color: 'red',
    //     title: 'Notification',
    //     message: 'Please Take One Picture Describing The Activity!',
    //     rd: 'md',
    //     autoClose: false,
    //     styles: (theme) => ({
    //       root: {
    //         borderColor: theme.colors.red[9],
    // backgroundColor: theme.colors.red[1],
    //         '&::before': { backgroundColor: theme.red },
    //       },

    //       title: { color: theme.colors.red[7] },
    //       closeButton: {
    //         color: theme.colors.gray[7],
    //         '&:hover': {
    //           color: theme.white,
    //           backgroundColor: theme.colors.gray[6],
    //         },
    //       },
    //     }),
    //   })
    // }
    // if (urlAttendance !== '') {
    updateActivity({
      variables: { id: activity.id, input: { urlAttendance } },
    })
    // }
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure save attendance?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () => createAttendance({ variables: { input: result } }),
    })
  }
  const onFileUpload = (response) => {
    setUrlAttendance(response.filesUploaded[0].url)
    setNameAttendance(response.filesUploaded[0].filename)
  }
  const handleImg = () => {
    setUrlAttendance(null)
    setNameAttendance(null)
  }
  const handleCheckAll = (e) => {
    setCheckedState(new Array(members.length).fill(e.target.checked))
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
            <tr
              style={{
                color: '#A61E4D',
              }}
            >
              <th>
                <span>Present All</span>
              </th>
              <th>
                <input
                  ref={checkAllRef}
                  type="checkbox"
                  onChange={(e) => handleCheckAll(e)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {activity.group.members.map((member, index) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td className="attendance-checkbox">
                  <span>Present</span>
                  <input
                    type="checkbox"
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
        <label>
          Picture<span> (Take a picture of your activity )</span>
        </label>
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
        <button className="btn-purple" disabled={loading}>
          <ion-icon name="arrow-redo-outline"></ion-icon>Submit
        </button>
      </Form>
    </div>
  )
}
export default Attendance
