import { useQuery, useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import { navigate, routes } from '@redwoodjs/router'
import { showNotification, updateNotification } from '@mantine/notifications'
import { TextInput, Button } from '@mantine/core'

import SelectField from 'src/components/Form/SelectField/SelectField'
import 'src/components/Member/MemberForm/MemberForm.scss'

const LEADER_NO_GROUP = gql`
  query LeaderNoGroup {
    leaderNoGroup {
      id
      name
      email
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
          color: 'blue',
          title: 'Group Has Been Created!',
          message: 'You can add member to this Group',
          autoClose: 4000,
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
      }, 1000)
      setTimeout(() => {
        navigate(routes.groups())
      }, 1200)
    },
    onError: () => {
      showNotification({
        color: 'red',
        title: 'Error! Please Check Again',
        message: 'One User Only Has One Group',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[7] },
          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    }
  })
  const { loading, error, data } = useQuery(LEADER_NO_GROUP)
  //  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let leaders = []
  if (data) {
    leaders = data.leaderNoGroup
  }
  const leaderSelect = leaders.map((leader) => ({
    value: leader.id,
    label: leader.name || leader.email,
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
    // const arr = values.name.split(' ')
    // const arr2 = arr.shift()
    // const result = arr2.concat(arr.map((i) =>  i[0]).join(""))
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
