import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'
import { useForm } from 'react-hook-form'
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
  const formMethods = useForm()
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
            color: 'blue',
            title: 'Member Has Been Created!',
            message: 'You can add member to one Group',
            autoClose: 3000,
            radius: 'md',
            styles: (theme) => ({
              root: {
                borderColor: theme.colors.blue[9],
                backgroundColor: theme.colors.blue[2],
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
        }, 1200)
        formMethods.reset()
      },
      onError: () => {
        showNotification({
          color: 'red',
          title: "Error! Member hasn't created yet",
          message: 'Please check phone number is unique!',
          autoClose: 8000,
          radius: 'md',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.red[9],
              backgroundColor: theme.colors.red[1],
              '&::before': { backgroundColor: theme.red },
            },

            title: { color: theme.colors.red[5] },
            closeButton: {
              color: theme.colors.gray[6],
              '&:hover': { backgroundColor: theme.colors.gray[4] },
            },
          }),
        })
      },
    }
  )

  const onSave = (data, input) => {
    createMember({ variables: { input: { ...input, ...data } } })
  }

  return (
    <MemberForm onSave={onSave} loading={loading} formMethods={formMethods} />
  )
}

export default NewMember
