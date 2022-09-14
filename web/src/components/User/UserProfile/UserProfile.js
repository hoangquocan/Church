import {
  Text,
  Avatar,
  Button,
  Center,
  Group,
  Stack,
  Modal,
  Divider,
} from '@mantine/core'
import { useState } from 'react'

import EditProfile from 'src/components/User/EditProfile/EditProfile'

const UserProfile = ({ user }) => {
  const [opened, setOpened] = useState(false)
  const role = user.userRoles
    .filter((role) => role.name !== 'user')
    .map((role) => role.name.toUpperCase())
    .join(' - ')
  const handleModal = () => {
      setOpened(false)
  }
  return (
    <div className="user-profile">
      <Modal
        title="Edit Profile"
        opened={opened}
        onClose={() => setOpened(false)}
        styles={(theme) => ({
          header: {
            fontSize: '1.4rem',
            marginBottom: '0',
            // borderBottom: '1px solid rgba(22, 24, 35, 0.2)',
            fontWeight: 500,
          },
        })}
      >
        <EditProfile user={user} handleModal={handleModal}/>
      </Modal>
      <Center mt={20}>
        <Stack>
          <Group>
            <Avatar src={user.avatar} size={100} radius="50%" color="blue" />
            <Stack spacing="xs">
              <Text size="xl" weight="500" sx={{ lineHeight: 1 }}>
                {user.name || 'Not update '}
              </Text>
              <Text weight="500" italic>{user.email}</Text>
              <Button onClick={() => setOpened(true)} variant="default">
                Edit Profile
                <ion-icon
                  style={{ marginLeft: '10px', fontSize: '1.2rem' }}
                  name="arrow-redo-outline"
                ></ion-icon>
              </Button>
            </Stack>
          </Group>
          <Group>
            {/* {user.userRoles.filter((role) => (role.name !== 'user')).map((role) =>  <Text size="md" weight="500">{(role.name).toUpperCase()}</Text>) || user.userRoles} */}
            <Text size="md" weight="500">
              {role || 'USER'}
            </Text>
            {/* <Text></Text> */}
          </Group>
          <Text>{user.bio || 'No Bio Yet.'}</Text>
        </Stack>
      </Center>
      <Divider mt="10px" ml="-22px" mr="-40px" right="0"/>
    </div>
  )
}

export default UserProfile
