import {
  Text,
  Avatar,
  Center,
  Group,
  Stack,
  Modal,
  Divider,
} from '@mantine/core'
import { useState } from 'react'

import EditProfile from 'src/components/User/EditProfile/EditProfile'
import './UserProfile.scss'

const UserProfile = ({ user }) => {
  const [opened, setOpened] = useState(false)

  const role = user.userRoles
    .filter((role) => role.name !== 'user')
    .map((role) => role.name.toUpperCase())
    .join(' - ')

  const handleModal = () => {
    setOpened(false)
  }
  const checkLeader = (user) => {
    const roles = user.userRoles.map((role) => role.name)
    return roles.includes('leader')
  }
  return (
    <div className="user-profile">
      <Modal
        title="Edit Profile"
        zIndex={100}
        opened={opened}
        onClose={() => setOpened(false)}
        // overlayColor='transparent'
        // centered
        styles={(theme) => ({
          modal: {
            width: 600,
            height: 600,
            borderRadius: '10px',
            marginTop: '50px',
            marginLeft: '300px',
            '@media(max-width: 1024px)': {
              width: 520,
            marginLeft: '0px',
            },
            '@media(max-width: 480px)': {
              marginTop: '20px',
              width: 410,
            },
          },
          inner: {
            textAlign: 'center',
          },
          header: {
            fontSize: '28px',
            marginBottom: '10px',
            marginLeft: '80px',
            fontWeight: 500,
            '@media(max-width: 1024px)': {
              marginLeft: '40px',
            },
            '@media(max-width: 480px)': {
              marginLeft: '0',
            },
          },
          close: {
            backgroundColor: '#f2f2f2',
            marginRight: 30,
            width: 32,
            height: 32,
            borderRadius: '50%',
          },
        })}
      >
        <EditProfile user={user} handleModal={handleModal} />
      </Modal>
      <Center mt={40} style={{ color: '#46e6fc' }}>
        <Stack spacing='xs'>
          <Group>
            <Avatar
              src={user.avatar}
              size={100}
              radius="50%"
              color="blue"
              style={{ marginRight:'20px', border: '3px solid #fff' }}
            />
            <Stack spacing="xs">
              <Text size="xl" weight="500" sx={{ lineHeight: 1 }}>
                {user.name || 'Not update '}
              </Text>
              <Text weight="500" italic>
                {user.email}
              </Text>
              <button onClick={() => setOpened(true)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Edit Profile
                <ion-icon
                  style={{ marginLeft: '10px', fontSize: '24px' }}
                  name="arrow-redo-outline"
                ></ion-icon>
              </button>
            </Stack>
          </Group>
            <Text size="md" weight="500">
              {role || 'USER'}
            </Text>
            <Text>{checkLeader(user) ? user.group?.name : null}</Text>
          <Text color='#fff'>{user.bio || 'No Bio Yet.'}</Text>
        </Stack>
      </Center>
      <Divider size='md' mt="30px" ml="-22px" mr="-40px" right="0" />
    </div>
  )
}

export default UserProfile
