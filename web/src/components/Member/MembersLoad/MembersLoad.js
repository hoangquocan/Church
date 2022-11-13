import { useEffect, useState, memo, useRef, useMemo } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { Avatar, Text, Menu, Modal, Divider, Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { IconEdit, IconMail, IconTrash, IconEye } from '@tabler/icons'
import { useAuth } from '@redwoodjs/auth'
import EditMember from '../EditMember/EditMember'
import './MembersLoad.scss'
import Member from '../Member/Member'

export const QUERY = gql`
  query MembersLoadQuery($load: Int!) {
    membersLoad(load: $load) {
      members {
        id
        name
        phoneNumber
        email
        birthDate
        urlAvatar
        group {
          id
          name
        }
        address
        createdAt
      }
      count
    }
  }
`
const DELETE_MEMBER = gql`
  mutation DeleteMember($id: Int!) {
    deleteMember(id: $id) {
      id
    }
  }
`

const MembersLoad = () => {
  const [membersRender, setMembersRender] = useState([])
  const [loadMembers, setLoadMembers] = useState(1)
  const [opened, setOpened] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [idx, setIdx] = useState()
  const [member, setMember] = useState()

  const iconRefs = useRef([])
  const { hasRole } = useAuth()
  const { loading, data } = useQuery(QUERY, {
    variables: { load: loadMembers },
  })
  let membersQuery = []
  if (data) {
    membersQuery = data?.membersLoad.members
  }
  const findIndexChange = (arr, target) => {
    return arr.findIndex((item) => !target.includes(item))
  }
  const checker = (arr, target) => target.some((v) => arr.includes(v))

  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, membersRender.length)
    if (data) {
      const membersArr = data?.membersLoad.members
      const membersRenderId = membersRender.map((item) => item.id)
      const idAvai = membersArr.map((item) => item.id)
      const ind = findIndexChange(idAvai, membersRenderId)
      if (!checker(membersRender, membersArr)) {
        setMembersRender((prev) => [...prev, ...membersArr])
      }
      // Delete
      else if (ind == 7 && membersRender.length < data.membersLoad.count) {
        setMembersRender((prev) => [...prev, membersArr[7]])
      }
    }
  }, [data])

  const [deleteMember] = useMutation(DELETE_MEMBER, {
    onCompleted: (idx) => {
      showNotification({
        color: 'red',
        title: 'Member Has Been Deleted!',
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
    onError: (error) => {
      showNotification({
        color: 'red',
        title: `${error}`,
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.colors.gray[6],
            '&:hover': { backgroundColor: theme.colors.gray[4] },
          },
        }),
      })
    },
    refetchQueries: [{ query: QUERY, variables: { load: loadMembers } }],
  })

  if (loading && loadMembers === 1) {
    return (
      <div
        style={{
          textAlign: 'center',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <Loader variant="oval" size="md" color="blue" />
      </div>
    )
  }
  const totalMembers = data?.membersLoad?.count
  const handleLoadMembers = () => {
    if (membersRender.length >= data?.membersLoad?.count) {
      return showNotification({
        title: 'All members have been loaded!',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            height: '60px',
            borderColor: theme.colors.gray[6],
            backgroundColor: theme.colors.gray[7],
            '&::before': { backgroundColor: theme.white },
          },
          title: {
            color: theme.white,
          },
          icon: {
            backgroundColor: theme.white,
            color: theme.white,
          },
          closeButton: {
            color: theme.colors.white,
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    } else {
      setLoadMembers((prev) => prev + 1)
    }
  }

  const handleMouseEnter = (idx) => {
    setTimeout(() => {
      iconRefs.current[idx].classList.add('hovered')
    }, 400)
  }
  const handleMouseLeave = (idx) => {
    setTimeout(() => {
      iconRefs.current[idx].classList.remove('hovered')
    }, 400)
  }

  const handleModal = (idx) => {
    if (findIndexChange(membersQuery, membersRender) >= 0) {
      setMembersRender((prev) => {
        prev.splice(
          idx,
          1,
          membersQuery[findIndexChange(membersQuery, membersRender)]
        )
        return prev
      })
    }
    setOpened(false)
    setOpenProfile(false)
  }

  const handleDelete = (id, idx) => {
    if (!hasRole(['admin', 'manager'])) {
      return showNotification({
        color: 'red',
        title: 'Error! Only admin, manager can use this feature',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.colors.gray[6],
            '&:hover': { backgroundColor: theme.colors.gray[4] },
          },
        }),
      })
    }
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete this member?</p>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteMember({
          variables: { id },
        })
        setMembersRender((prev) => {
          prev.splice(idx, 1)
          return prev
        })
      },
    })
  }

  return (
    <>
      <div className="members-wrapper">
        {membersRender?.map((member, idx) => (
          <div
            key={member.id}
            className="members-item"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <Avatar
              src={member.urlAvatar}
              radius="50%"
              size="80px"
              mt={-40}
              color="cyan"
              styles={() => ({
                root: {
                  border: '3px solid #1A1B1E',
                  '@media(max-width: 768px)': {
                    minWidth: '60px',
                    width: '60px',
                    height: '60px',
                  },
                },
              })}
            />
            <Text align="center" size="20px" weight={500} color="#A61E4D">
              {member.name}
            </Text>
            <Text align="center" size="md">
              {new Date(member.birthDate).toLocaleDateString('pt-BR')}
            </Text>
            <Text align="center" size="md">
              {member.phoneNumber}
            </Text>
            <Text align="center" size="md" italic>
              {member.email}
            </Text>
            <Text lineClamp={1} align="center" size="md">
              {member.address}
            </Text>
            <Text align="center" size="md">
              {member.group?.name || 'No Group Yet'}
            </Text>
            <Menu
              width={200}
              trigger="hover"
              openDelay={300}
              closeDelay={100}
              position="bottom-end"
              shadow="rgba(0, 0, 0, 0.7) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
              styles={(theme) => ({
                divider: {
                  borderColor: theme.colors.gray[5],
                },
                dropdown: {
                  background: '#25262B',
                },
                item: {
                  margin: '2px 0',
                  ':hover:not(:last-child)': {
                    color: '#000',
                  },
                },
              })}
            >
              <Menu.Target>
                <ion-icon
                  ref={(el) => (iconRefs.current[idx] = el)}
                  name="ellipsis-horizontal-outline"
                ></ion-icon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="white"
                  icon={<IconEye size={20} />}
                  onClick={() => {
                    setMember(member)
                    setIdx(idx)
                    setOpenProfile(true)
                  }}
                >
                  View Profile
                </Menu.Item>
                <Divider />
                <Menu.Item
                  onClick={() => {
                    setMember(member)
                    setIdx(idx)
                    setOpened(true)
                  }}
                  color="white"
                  icon={<IconEdit size={20} />}
                >
                  Update
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="white"
                  icon={<IconMail size={20} />}
                  onClick={() => window.open('https://mail.google.com')}
                >
                  Send Email
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={20} />}
                  onClick={() => handleDelete(+member.id, idx)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ))}

        <Modal
          // title="Member Profile"
          opened={openProfile}
          onClose={() => setOpenProfile(false)}
          zIndex={3}
          overlayColor="transparent"
          styles={() => ({
            modal: {
              marginTop: '20px',
              backgroundColor: 'rgba(0, 0, 0, .9)',
              '@media(min-width: 1024px)': {
                marginTop: '50px',
                marginLeft: '300px',
                width: '700px',
              },
            },
            header: {
              fontSize: '1.4rem',
              fontWeight: 500,
              color: '#fff',
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
          <Member member={member} handleModal={handleModal} idx={idx} />
        </Modal>
        <Modal
          title="Update Member"
          opened={opened}
          onClose={() => setOpened(false)}
          zIndex={3}
          styles={(theme) => ({
            modal: {
              marginTop: '50px',
              width: 'auto',
              backgroundColor: '#2C2E33',
              '@media(min-width: 1024px)': {
                marginLeft: '300px',
              },
            },
            title: {
              margin: '0 auto',
              fontSize: '28px',
              fontWeight: 500,
              color: '#fff',
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
          <EditMember member={member} handleModal={handleModal} idx={idx} />
        </Modal>
      </div>
      {totalMembers > 8 && (
        <button
          style={{
            color: '#fff',
            width: '200px',
            padding: '10px 10px',
            borderColor: '#753a88',
            backgroundImage: 'linear-gradient(to right, #753a88, #C2255C)',
          }}
          className="btn-purple"
          onClick={handleLoadMembers}
        >
          <ion-icon
            style={{ fontSize: 24, marginRight: 10, fontWeight: 700 }}
            name="sync-outline"
          ></ion-icon>{' '}
          Load More
        </button>
      )}
    </>
  )
}

export default memo(MembersLoad)
