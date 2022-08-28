import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'

import GroupForm from 'src/components/Group/GroupForm'

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      leader
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
          color: 'cyan',
          title: 'Group Has Been Created!',
          message: 'You can add member to this Group',
          icon: <ion-icon name="checkmark-outline"></ion-icon>,
          autoClose: 4000,
          radius: 'lg',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.blue[4],
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
  const onSave = (input) => {
    createGroup({ variables: { input } })
  }

  return (
    <>
      <h3 className="text-center">Add New Group</h3>
      <div>
        <GroupForm onSave={onSave} loading={loading} error={error} />
      </div>
    </>
  )
}

export default NewGroup
