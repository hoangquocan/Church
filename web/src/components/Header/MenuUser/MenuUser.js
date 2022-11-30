import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
// import { Loader } from '@mantine/core'
import { Avatar, Menu, Indicator } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import './MenuUser.scss'

const QUERY_USER = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      email
      avatar
    }
  }
`
const MenuUser = () => {
  // const [count, setCount] = useState(8)
  const [email, setEmail] = useState('')
  const { logOut, userMetadata } = useAuth()

  const { loading, error, data } = useQuery(QUERY_USER, {
    skip: !email,
    variables: { email },
  })
  let user = {}
  if (data) {
    user = data.user
  }
  useEffect(() => {
    setTimeout(() => {
      const emailCurrent = userMetadata.email
      setEmail(emailCurrent)
    }, 2000)
    return () => {
      clearTimeout()
    }
  }, [userMetadata])

  const onClick = async () => {
    await logOut()
    navigate('/')
  }

  return (
    <div className="header-menu-user">
      {/* <Indicator label={''} inline size={19}>
        <ion-icon
          style={{ color: '#06beb6' }}
          name="notifications-outline"
        ></ion-icon>
      </Indicator> */}

      <Menu
        shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
        trigger="click"
        position="bottom-end"
        closeOnItemClick={false}
        styles={(theme) => ({
          divider: {
            borderColor: theme.colors.gray[7],
          },
          itemLabel: {
            display: 'flex',
            alignItems: 'center',
          },
          item: {
            '&[data-hovered]': {
              backgroundColor: theme.colors.cyan[4],
              color: theme.white,
            },
          },
        })}
      >
        <Menu.Target>
          <Avatar
            src={user ? user.avatar : ''}
            radius="50%"
            size="lg"
            color="cyan"
            ml="md"
            styles={(theme) => ({
              root: {
                boxShadow: 'inset 0 2px 4px 0 #46e6fc',
                '@media (max-width: 480px)': {
                  minWidth: '40px',
                  width: '40px',
                  height: '40px',
                },
                '&:hover': {
                  cursor: 'pointer',
                },
              },
            })}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Link to={routes.userProfile({ email: email })} title=" View Profile">
            <Menu.Item  closeMenuOnClick>
              <ion-icon name="person-circle-outline"></ion-icon>View Profile
            </Menu.Item>
          </Link>
          <Menu.Item>
            <Menu
              position="bottom"
              closeOnItemClick={false}
              withArrow
              offset={12}
              trigger="click"
              shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
              styles={(theme) => ({
                dropdown: {
                  left: 0,
                  background: '#E9ECEF',
                },
                itemLabel: {
                  display: 'flex',
                  alignItems: 'center',
                },
                item: {
                  '&[data-hovered]': {
                    backgroundColor: theme.colors.cyan[4],
                    color: theme.white,
                  },
                },
              })}
            >
              <Menu.Target>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <ion-icon name="settings-outline"></ion-icon>
                  Setting
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a">
                  <Menu
                    position="left"
                    width={180}
                    closeOnItemClick={false}
                    withArrow
                    offset={18}
                    trigger="click"
                    shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
                    styles={(theme) => ({
                      dropdown: {
                        left: 0,
                        background: '#E9ECEF',
                      },
                      itemLabel: {
                        display: 'flex',
                        alignItems: 'center',
                      },
                      item: {
                        '&[data-hovered]': {
                          backgroundColor: theme.colors.cyan[4],
                          color: theme.white,
                        },
                      },
                    })}
                  >
                    <Menu.Target>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <ion-icon name="language-outline"></ion-icon>Language
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>English</Menu.Item>
                      <Menu.Item>Tiếng Việt</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Menu.Item>
                <Menu.Item component="a">
                  <Menu
                    position="left"
                    width={180}
                    closeOnItemClick={false}
                    withArrow
                    offset={18}
                    trigger="click"
                    shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
                    styles={(theme) => ({
                      dropdown: {
                        left: 0,
                        background: '#E9ECEF',
                      },
                      itemLabel: {
                        display: 'flex',
                        alignItems: 'center',
                      },
                      item: {
                        '&[data-hovered]': {
                          backgroundColor: theme.colors.cyan[4],
                          color: theme.white,
                        },
                      },
                    })}
                  >
                    <Menu.Target>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <ion-icon name="moon-outline"></ion-icon>Appearance
                      </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item>Dark Theme</Menu.Item>
                      <Menu.Item>Light Theme</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Menu.Item>
          <Link to={routes.feedback()}>
            <Menu.Item>
              <ion-icon name="help-circle-outline"></ion-icon>
              Feedback And Help
            </Menu.Item>
          </Link>
          <Menu.Divider />
          <Menu.Item onClick={onClick} className="btn-logout">
            <ion-icon name="log-out-outline"></ion-icon>Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default MenuUser
