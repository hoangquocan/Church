import { Menu, Modal } from '@mantine/core'
import { useState, useRef, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { IconEdit, IconTrash } from '@tabler/icons'

import { QUERY } from '../QuestionsViewCell'
import UpdateQuestion from '../UpdateQuestion/UpdateQuestion'
import './ManagerQuestion.scss'

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestionMutation($id: Int!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`
const ManagerQuestion = ({ questionsView }) => {
  const [opened, setOpened] = useState(false)
  const [question, setQuestion] = useState()

  const iconsRef = useRef([])
  const divRefs = useRef([])
  // useEffect(() => {
  //   iconsRef.current = iconsRef.current.slice(0, questionsView.length)
  //   divRefs.current = divRefs.current.slice(0, questionsView.length)
  // }, [questionsView])
  // useEffect(() => {
  //   document.addEventListener('click', handleClick)
  //   return () => document.removeEventListener('click', handleClick)
  // }, [])
  // const handleClick = (e) => {
  //   if (
  //     !iconsRef.current.includes(e.target) &&
  //     !divRefs.current.includes(e.target)
  //   ) {
  //     setTimeout(() => {
  //       iconsRef.current.map((item) => item.classList.remove('hover'))
  //     }, 400)
  //   } else {
  //     return null
  //   }
  // }

  const [deleteQuestion, { error }] = useMutation(DELETE_QUESTION_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Questions have been deleted!',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[7],
            backgroundColor: theme.colors.red[1],
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
    },
    onError: () => {
      showNotification({
        color: 'red',
        title: 'Questions have been reported by Leader can not delete!',
        autoClose: false,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],
            backgroundColor: theme.colors.red[1 ],
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
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const handleMouseOver = (i) => {
    setTimeout(() => {
      iconsRef.current[i].classList.add('hover')
    }, 300)
  }
  const handleMouseLeave = (i) => {
    setTimeout(() => {
      iconsRef.current[i].classList.remove('hover')
    }, 300)
  }

  const handleModal = () => {
    setOpened(false)
  }

  const handleDelete = (id) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete these Questions</p>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        deleteQuestion({
          variables: { id },
        }),
    })
  }
  return (
    <div style={{ color: '#fff' }} className="manager-questions">
      {/* <h2>Manager Question</h2> */}
      {questionsView.map((question, i) => (
        <div
          key={i}
          style={{
            marginTop: '30px',
            backgroundColor: '#f2f2f2',
            color: '#000',
          }}
          ref={(el) => (divRefs.current[i] = el)}
          className="manager-questions-item"
          onMouseEnter={() => handleMouseOver(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <Menu
            width={200}
            height={90}
            trigger="hover"
            openDelay={100}
            closeDelay={200}
            position="bottom-end"
            shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
            styles={(theme) => ({
              divider: {
                borderColor: theme.colors.gray[5],
              },
              dropdown: {
                background: '#25262B',
              },
              item: {
                '&:firstChild': {
                  margin: '4px 0',
                  ':hover': {
                    color: '#000',
                  },
                },
              },
            })}
          >
            <Menu.Target>
              <ion-icon
                ref={(el) => (iconsRef.current[i] = el)}
                name="ellipsis-horizontal-outline"
              ></ion-icon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setQuestion(question)
                  setOpened(true)
                }}
                color="gray"
                icon={<IconEdit size={16} />}
              >
                Update Questions
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                onClick={() => handleDelete(question.id)}
                color="red"
                icon={<IconTrash size={16} />}
              >
                Delete Questions
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <h4>
            T{new Date(question.time).getMonth() +
              1 +
              '/' +
              new Date(question.time).getFullYear()}
          </h4>
          <div>
            <p style={{ margin: '20px' }}>{question.questionOne}</p>
            <p style={{ margin: '20px' }}>{question.questionTwo}</p>
            <p style={{ margin: '20px' }}>{question.questionThree}</p>
          </div>
        </div>
      ))}
      <Modal
        title="Update Questions"
        opened={opened}
        onClose={() => setOpened(false)}
        styles={() => ({
          modal: {
            width: 800,
            '@media(max-width: 900px)': {
              width: 400,
            },
          },
          title: {
              margin: '0 auto',
              fontSize: '28px',
              fontWeight: 500,
            },
          close: {
            backgroundColor: '#f2f2f2',
            marginRight: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
          },
        })}
      >
        <UpdateQuestion question={question} handleModal={handleModal} />
      </Modal>
    </div>
  )
}

export default ManagerQuestion
