import { useQuery, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'
import { TextInput, Button } from '@mantine/core'

import SelectField from 'src/components/Form/SelectField/SelectField'
import 'src/components/Member/MemberForm/MemberForm.scss'

const QUERY_LEADERS = gql`
  query QueryLeaders {
    usersLeader {
      id
      user {
        id
        name
        email
      }
    }
  }
`
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
const GroupForm = () => {
  const [leader, setLeader] = useState('')
  const [createGroup] = useMutation(CREATE_GROUP_MUTATION, {
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
          // icon: <ion-icon name="checkmark-outline"></ion-icon>,
          autoClose: 3000,
          radius: 'md',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.blue[7],
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
  const { loading, error, data } = useQuery(QUERY_LEADERS)
  //  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let leaders = []
  if (data) {
    leaders = data.usersLeader
  }
  const leaderSelect = leaders.map((leader) => ({
    value: leader.user.id,
    label: leader.user.email,
  }))
  const form = useForm({
    initialValues: {
      name: '',
      userId: '',
    },
    validate: {
      userId: (value) =>
        leaderSelect.some((item) => item.label === leader)
          ? null
          : 'Please Choose One Leader',
    },
  })

  const handleSubmit = (values) => {
    createGroup({ variables: { input: values } })
  }

  return (
    <div className="member-form">
      <form
        style={{ paddingTop: '140px' }}
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <label>Group Name</label>
        <TextInput autoFocus {...form.getInputProps('name')} />

        <label>Select Leader</label>
        <SelectField
          value={leader}
          onSearchChange={setLeader}
          data={leaderSelect}
          {...form.getInputProps('userId')}
        />

        <div className="form-btn">
          <Button type="submit" disabled={loading}>
            Save <ion-icon name="checkmark-circle-outline"></ion-icon>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GroupForm
