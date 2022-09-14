import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'

import MemberForm from 'src/components/Member/MemberForm'

const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMemberMutation($input: CreateMemberInput!) {
    createMember(input: $input) {
      id
      name
      birthDate
      phoneNumber
      email
      address
    }
  }
`
const NewMember = () => {
  const [createMember, { loading, error }] = useMutation(
    CREATE_MEMBER_MUTATION,
    {
      onCompleted: () => {
        showNotification({
          id: 'load-data',
          loading: true,
          title: 'Loading your data!',
          message: 'Data will be loaded in just one second',
          autoClose: false,
          disallowClose: true,
          radius: 'md',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.blue[4],
            },
          }),
        })

        setTimeout(() => {
          updateNotification({
            id: 'load-data',
            // color: 'cyan',
            title: 'Member Has Been Created!',
            message: 'You can add member to one Group',
            // icon: <ion-icon name="checkmark-outline"></ion-icon>,
            autoClose: 3000,
            radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[5],
            '&::before': { backgroundColor: theme.blue },
          },
          closeButton: {
            color: theme.gray,
            '&:hover': { color: theme.white, backgroundColor: theme.colors.gray[6] },
          },
        }),
          })
        }, 1000)
        setTimeout(() => {
          navigate(routes.members())
        }, 1200)
      },
    }
  )

  const onSave = (data, input) => {
    createMember({ variables: { input: { ...input, ...data } } })
  }

  return (
    <>
      <h2 className="text-center">Add New Member</h2>

      <MemberForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default NewMember
