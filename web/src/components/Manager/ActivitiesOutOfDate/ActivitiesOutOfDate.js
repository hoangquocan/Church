import { useRef, useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import { Text, Modal } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import Attendance from 'src/components/Attendance/Attendance'
import 'src/components/Home/UpcomingActivities/UpcomingActivities.scss'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`
const ActivitiesOutOfDate = ({ activities }) => {
  const [opened, setOpened] = useState(false)
  const [activity, setActivity] = useState()
  const [activitiesOOD, setActivitiesOOD] = useState([])
  const btnRefs = useRef([])
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, activities?.length)
    setActivitiesOOD(activities)
  }, [activities])

  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Activity Has Been Deleted!',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[2],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.gray[6] },
          },
        }),
      })
    },
  })
  const handleMouseEnter = (idx) => {
    setTimeout(() => {
      btnRefs.current[idx].classList.add('hovered')
    }, 500)
  }
  const handleMouseLeave = (idx) => {
    setTimeout(() => {
      btnRefs.current[idx].classList.remove('hovered')
    }, 600)
  }
  const handleModal = () => {
    setOpened(false)
  }
  const handleDelete = (id, name, idx) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete Activity {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteActivity({ variables: { id } })
        setActivitiesOOD((prev) => {
          prev.splice(idx, 1)
          return prev
        })
      },
    })
  }

  return (
    <>
      <h2 className="text-title">Activities Out Of Date</h2>

      <div className="upcomingActivities-wrapper">
        {activitiesOOD.map((activity, idx) => (
          <div
            key={activity.id}
            className="activity-item"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <Text size={24} weight={700} color="#A61E4D" ml={10} mr={10}>
              {activity.name}
            </Text>
            <Text>{new Date(activity.date).toLocaleString('pt-BR')}</Text>
            <Text>{activity.group.name}</Text>
            <button
              className="inline-button inline-button-small inline-button-red"
              onClick={() => handleDelete(+activity.id, activity.name, idx)}
            >
              Delete
            </button>
            <div
              className="attendance-btn"
              ref={(el) => (btnRefs.current[idx] = el)}
              onClick={() => {
                setActivity(activity)
                setOpened(true)
              }}
            >
              Implement<ion-icon name="arrow-redo-outline"></ion-icon>
            </div>
          </div>
        ))}
        <Modal
          title="Make Attendance"
          opened={opened}
          onClose={() => setOpened(false)}
          zIndex={101}
          overlayOpacity={0.2}
          overlayBlur={3}
          centered
          styles={(theme) => ({
            root: {
              '@media(max-width: 480px)': {},
            },
            modal: {
              background: '#2C2E33',
              // background: 'linear-gradient(  #5C5F66,#5C5F66,#5C5F66)',
              boxShadow: '0 15px 25px rgba(0, 0, 0, .9)',
              width: 800,
              borderRadius: '10px',
              '@media(max-width: 768px)': {
                width: 600,
              },
              '@media(max-width: 480px)': {
                width: 410,
                padding: 2,
              },
            },
            title: {
              margin: '0 auto',
              fontSize: '28px',
              fontWeight: 500,
              color: '#fff',
              // marginBottom: 0,
            },
            inner: { backgroundColor: 'transparent' },
            close: {
              backgroundColor: '#DEE2E6',
              // borderColor: '#000',
              marginRight: 14,
              marginTop: 2,
              color: '#000',
              borderRadius: '50%',
            },
          })}
        >
          <Attendance activity={activity} handleModal={handleModal} />
        </Modal>
      </div>
    </>
  )
}
// export default memo(ActivitiesOutOfDate)
export default ActivitiesOutOfDate

