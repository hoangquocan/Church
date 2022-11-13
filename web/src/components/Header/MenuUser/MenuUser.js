import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
// import { Loader } from '@mantine/core'
import { Avatar, Menu, Indicator, createStyles } from '@mantine/core'
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
  // if (loading) {
  //   return <div>Auth Loading...</div>
  // }
  if (error) return `Error! ${error.message}`
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
  const useStyles = createStyles((theme) => ({
    shadow: {
      boxShadow: theme.shadows.md,
    },
    item: {
      '&[data-hovered]': {
        backgroundColor: theme.colors.cyan[4],
        color: theme.white,
      },
    },
  }))
  const { classes } = useStyles()

  return (
    <div className="header-menu-user">
      <Indicator label={''} inline size={19}>
        <ion-icon
          style={{ color: '#06beb6' }}
          name="notifications-outline"
        ></ion-icon>
      </Indicator>

      <Menu
        classNames={classes}
        shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
        trigger="hover"
        closeDelay={400}
        position="bottom-end"
        styles={(theme) => ({
          divider: {
            borderColor: theme.colors.gray[7],
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
              },
            })}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Link to={routes.userProfile({ email: email })} title=" View Profile">
            <Menu.Item>
              <ion-icon name="person-circle-outline"></ion-icon>View Profile
            </Menu.Item>
          </Link>
          <Menu.Item
            onClick={() =>
              showNotification({
                color: 'teal',
                title: 'Sorry! We are updating this feature',
                autoClose: 4000,
                radius: 'md',
                styles: (theme) => ({
                  root: {
                    borderColor: theme.colors.teal[7],
                    backgroundColor: theme.colors.teal[1],
                    '&::before': { backgroundColor: theme.teal },
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
            }
          >
            <ion-icon name="settings-outline"></ion-icon>Setting
          </Menu.Item>
          <Link to={routes.feedback()}>
            <Menu.Item>
              <ion-icon name="help-circle-outline"></ion-icon>Feedback And Help
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
