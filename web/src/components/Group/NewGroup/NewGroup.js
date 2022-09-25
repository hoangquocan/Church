import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'

import GroupForm from 'src/components/Group/GroupForm'

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      userId
      createdAt
    }
  }
`
const NewGroup = () => {
  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
    onCompleted: () => {
      showNotification({
        id: 'load-data',
        loading: true,
        title: 'Loading your data!',
        message: 'Data will be loaded in 1 second',
        autoClose: false,
        disallowClose: true,
        radius: 'lg',
      })

      setTimeout(() => {
        updateNotification({
          id: 'load-data',
          color: 'white',
          title: 'Group Has Been Created!',
          message: 'You can add member to this Group',
          icon: <ion-icon name="checkemark-outline"></ion-icon>,
          autoClose: 4000,
          radius: 'lg',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.blue[4],
              '&::before': { backgroundColor: theme.blue },
            },
            closeButton: {
              color: theme.gray,
              '&:hover': {
                color: theme.white,
                backgroundColor: theme.colors.gray[6],
              },
            },
          }),
        })
      }, 1000)
      setTimeout(() => {
        navigate(routes.groups())
      }, 1200)
    },
  })
  const onSave = (input, leader) => {
    createGroup({ variables: { input: { ...input, userId: leader } } })
  }

  return (
    <>
      <h2 className="text-center">Add New Group</h2>
      <GroupForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default NewGroup
