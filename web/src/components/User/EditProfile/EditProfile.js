import {
  Avatar,
  Divider,
  Group,
  Textarea,
  TextInput,
  Text,
  Stack,
  Button,
  Modal,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMutation } from '@redwoodjs/web'
import { useState, useEffect } from 'react'
import EditUserAvatar from '../EditUserAvatar/EditUserAvatar'
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
  const [file, setFile] = useState('')
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview)
    }
  }, [file])

  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      showNotification({
        title: 'Profile has been updated!',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.dark,
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
  const handleChange = (e) => {
    const avatar = e.target.files[0]
    avatar.preview = URL.createObjectURL(avatar)
    setFile(avatar)
    setOpened(true)
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
              styles={(theme) => ({
                root: {
                  '@media(max-width: 480px)': {
                    marginLeft: 10,
                  },
                },
              })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e)}
              onClick={(e) => (e.target.value = '')}
              required
            />
            <ion-icon name="camera-outline"></ion-icon>
          </Avatar.Group>
        </Stack>
      </Group>
      <Divider mb="30px" mt="20px" />
      <Group>
        <Text size="md" weight="500">
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
      <Divider mb="30px" mt="20px" />
      <Group>
        <Text size="md" mt="-52px" weight="500">
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
            input: {
              backgroundColor: '#f2f2f2',
              border: '1px solid transparent',
              '&:focus': {
                borderColor: '#CED4DA',
              },
            },
          })}
        />
      </Group>
      <Divider size="sm" mb="40px" mt="20px" ml="-20px" mr="-20px" />
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
      <Modal
        title="Update Avatar"
        opened={opened}
        onClose={() => setOpened(false)}
        zIndex={101}
        centered
        styles={(theme) => ({
          modal: {
            background: '#2C2E33',
            boxShadow: '0 15px 25px rgba(0, 0, 0, .9)',
            width: 600,
            height: 600,
            borderRadius: '10px',
            '@media(max-width: 1024px)': {
              width: 520,
            },
            '@media(max-width: 480px)': {
              width: 410,
            },
          },
          inner: {
            backgroundColor: 'transparent',
            textAlign: 'center',
          },
          header: {
            fontSize: '1.4rem',
            fontWeight: 500,
            color: '#fff',
            marginLeft: '30px',
          },
          close: {
            backgroundColor: '#DEE2E6',
            marginRight: 14,
            marginTop: 2,
            color: '#000',
            width: 36,
            height: 36,
            borderRadius: '50%',
          },
        })}
      >
        <EditUserAvatar file={file} user={user} handleModal={handleModal} />
      </Modal>
    </div>
  )
}

export default EditProfile
