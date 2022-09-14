import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
// import { Loader } from '@mantine/core'
import { Avatar, Menu, Indicator, createStyles } from '@mantine/core'

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
  const [count, setCount] = useState(8)
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
  // console.log(user)
  useEffect(() => {
    setTimeout(() => {
      const emailCurrent = userMetadata.email
      setEmail(emailCurrent)
    }, 2000)
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
      <Indicator label={count} inline size={19}>
        <ion-icon name="notifications-outline"></ion-icon>
      </Indicator>

      <Menu
        classNames={classes}
        shadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
        trigger="hover"
        closeDelay={400}
        position="bottom-end"
      >
        <Menu.Target>
          <Avatar
            src={user ? user.avatar : ''}
            radius="xl"
            size="md"
            color="blue"
            ml="md"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <Link
              to={routes.userProfile({ email: email })}
              title=" View Profile"
            >
              <ion-icon name="person-circle-outline"></ion-icon>View Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <ion-icon name="settings-outline"></ion-icon>Setting
          </Menu.Item>
          <Menu.Item>
            <ion-icon name="help-circle-outline"></ion-icon>Feedback And Help
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={onClick}>
            <ion-icon name="log-out-outline"></ion-icon>Log Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default MenuUser
