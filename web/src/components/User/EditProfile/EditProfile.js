import {
  Avatar,
  Divider,
  Group,
  Textarea,
  TextInput,
  Text,
  Stack,
  Button,
  Container,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { QUERY as UserQuery } from '../UserProfileCell'

import './EditProfile.scss'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      avatar
      bio
    }
  }
`

const EditProfile = ({ user, handleModal }) => {
  const [name, setName] = useState(user.name || '')
  const [bio, setBio] = useState(user.bio || '')
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      showNotification({
        title: 'Profile has been updated!',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.gray[8],
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
      }),
        handleModal()
    },
    refetchQueries: [{ query: UserQuery, variables: { email: user.email } }],
  })
  const handleSave = () => {
    updateUser({
      variables: { input: { name: name, bio: bio }, id: user.id },
    })
  }

  return (
    <div className="edit-profile">
      <Divider size="sm" mb="20px" ml="-20px" mr="-20px" />

      <Group>
        <Text size="md" mt="-80px" weight="500">
          Profile Avatar
        </Text>
        <Stack>
          <Avatar.Group spacing="sm">
            <Avatar
              src={user.avatar}
              size={90}
              radius="50%"
              color="blue"
              ml="50px"
            />

            <ion-icon name="camera-outline"></ion-icon>
          </Avatar.Group>
        </Stack>
      </Group>
      <Divider mb="20px" mt="8px" />
      <Group>
        <Text size="md" mt="-18px" weight="500">
          UserName
        </Text>
        <TextInput
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          styles={(theme) => ({
            root: {
              width: '238px',
              '@media (min-width: 480px)': {
                width: '290px',
              },
            },
          })}
        />
        <span
          style={{
            fontSize: '12px',
            marginLeft: '98px',
            fontStyle: 'oblique',
          }}
        >
          Username can be VietNamese
        </span>
      </Group>
      <Divider mb="20px" mt="10px" />
      <Group>
        <Text size="md" mt="-70px" weight="500">
          Bio
        </Text>
        <Textarea
          ml="56px"
          autosize
          minRows={3}
          value={bio}
          onChange={(e) => setBio(e.currentTarget.value)}
          styles={(theme) => ({
            root: {
              width: '238px',
              '@media (min-width: 480px)': {
                width: '290px',
              },
            },
          })}
        />
      </Group>
      <Divider size="sm" mb="20px" mt="10px" ml="-20px" mr="-20px" />
      <Button
        variant="default"
        onClick={() => handleModal()}
        style={{ width: '100px', marginLeft: '100px', fontWeight: '400' }}
      >
        Cancel
      </Button>
      <Button
        variant="default"
        onClick={handleSave}
        style={{ width: '100px', marginLeft: '20px', fontWeight: '400' }}
      >
        Save
      </Button>
    </div>
  )
}

export default EditProfile
