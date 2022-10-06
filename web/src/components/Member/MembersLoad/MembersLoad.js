import { useEffect, useState, memo, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Avatar, Text, Menu, Modal, Divider, Loader } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconMail, IconTrash } from '@tabler/icons'
import { Link, routes } from '@redwoodjs/router'

import EditMember from '../EditMember/EditMember'
import './MembersLoad.scss'

const QUERY = gql`
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

const MembersLoad = () => {
  const [membersRender, setMembersRender] = useState([])
  const [loadMembers, setLoadMembers] = useState(1)
  const [opened, setOpened] = useState(false)
  const [member, setMember] = useState()
  const iconRefs = useRef([])

  const { loading, error, data } = useQuery(QUERY, {
    variables: { load: loadMembers },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      // setMembersRender((prev) => [...prev, ...data.membersLoad.members])
      // if (membersRender.length == data?.membersLoad?.count) {
      //   alert(' end!')
      // }
    },
  })
  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, membersRender.length)
    if (data && !membersRender.includes(...data.membersLoad.members)) {
      // console.log(membersRender)
      setMembersRender((prev) => [...prev, ...data?.membersLoad.members])
    }
  }, [data, loadMembers])

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Loader variant="oval" size="md" color="white" />
      </div>
    )
  }
  // if (error) return `Error! ${error.message}`

  const handleLoadMembers = () => {
    if (membersRender.length >= data?.membersLoad?.count) {
      return showNotification({
        title: 'All users have been loaded!',
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

  const handleModal = () => {
    setOpened(false)
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
            <Link to={routes.member({ id: member.id })} title="View Profile">
              <Avatar
                src={member.urlAvatar}
                radius="50%"
                size="80px"
                mt={-30}
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
              />{' '}
            </Link>
            <Text align="center" size="20px" weight={500}>
              {member.name}
            </Text>
            <Text align="center" size="md">
              {new Date(member.birthDate).toLocaleDateString('sv')}
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
              height={90}
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
                  margin: '4px 0',
                  ':hover': {
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
                  onClick={() => {
                    setMember(member)
                    setOpened(true)
                  }}
                  color="white"
                  icon={<IconEdit size={16} />}
                >
                  Update Member
                </Menu.Item>
                <Divider />
                <a
                  target="_blank"
                  href="https://mail.google.com/mail/u/0/#inbox"
                >
                  <Menu.Item color="white" icon={<IconMail size={16} />}>
                    Send Email
                  </Menu.Item>
                </a>
                <Divider />
                <Menu.Item color="red" icon={<IconTrash size={16} />}>
                  Delete Member
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ))}

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
            header: {
              fontSize: '1.4rem',
              marginBottom: 0,
              paddingBottom: 10,
              fontWeight: 500,
            },
            close: {
              backgroundColor: '#f2f2f2',
              marginRight: 10,
              width: 32,
              height: 32,
            },
          })}
        >
          <EditMember member={member} handleModal={handleModal} />
        </Modal>
      </div>
      <button
        style={{
          width: '200px',
          padding: '10px 10px',
          borderColor: '#753a88',
          backgroundImage: 'linear-gradient(to right, #753a88, #C2255C)',
        }}
        className="btn-purple"
        onClick={handleLoadMembers}
      >
        Load More
      </button>
    </>
  )
}

export default memo(MembersLoad)
