import { Group, Text } from '@mantine/core'
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import {QUERY } from '../ManagerUsersCell'

const DELETE_ROLE = gql`
  mutation DeleteRole($id: Int!) {
    deleteUserRole(id: $id) {
      id
    }
  }
`

const EditUserRole = ({ user, handleModal }) => {
  const [deleteUserRole] = useMutation(DELETE_ROLE, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Role has been deleted!',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],

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
      }),
      handleModal()
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const handleDelete = (id) => {
    console.log(id)
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete this Role of User</p>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        deleteUserRole({
          variables: { id },
        }),
    })
  }
  return (
    <div className="editUserRole-wrapper">

      <Text align="center" size="lg" weight={700} >
        {user.name || 'No update yet'}
      </Text>
      <Text mb={40} align="center" size="md" color="dimmed">
        {user.email}
      </Text>
      {user.userRoles.map((role) => (
        <Group position='center'>

        <Text key={role.id} align="center" size="lg" weight={400}>
          {role.name == 'user' ? null : role.name.toUpperCase()}
        </Text>
          {role.name == 'user' ? null : (
            <ion-icon style={{color: 'gray', fontSize: '20px', "&:hover": {cursor: "pointer"}}}
              name="close-circle-outline"
              onClick={() => handleDelete(role.id)}
            ></ion-icon>
          )}
        </Group>
      ))}
    </div>
  )
}

export default EditUserRole
