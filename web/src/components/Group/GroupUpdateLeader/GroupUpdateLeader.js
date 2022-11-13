import { useQuery, useMutation } from '@redwoodjs/web'
import { TextInput, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'

import { QUERY } from '../GroupsCell'
import SelectField from 'src/components/Form/SelectField/SelectField'
import './GroupUpdateLeader.scss'

const LEADER_NO_GROUP = gql`
  query LeaderNoGroup {
    leaderNoGroup {
      id
      name
      email
    }
  }
`
const GROUP_UPDATE_LEADER = gql`
  mutation GroupUpdateLeader($id: Int!, $input: UpdateGroupInput!) {
    updateGroup(id: $id, input: $input) {
      id
      name
      userId
    }
  }
`

const GroupUpdateLeader = ({ group, page, handleModal }) => {
  const [leader, setLeader] = useState()
  const { data } = useQuery(LEADER_NO_GROUP)
  const [updateGroup] = useMutation(GROUP_UPDATE_LEADER, {
    onCompleted: () => {
      showNotification({
        title: 'Group has been updated!',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.teal,
            backgroundColor: theme.colors.teal[2],
            '&::before': { backgroundColor: theme.colors.teal },
          },
          title: {
            color: theme.colors.teal,
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
    refetchQueries: [{ query: QUERY, variables: { page: page } }],
  })

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
      name: group.name,
      userId: group.leader?.id,
    },
    validate: {
      userId: (value) => (value > 0 ? null : 'Please Choose One Leader'),
    },
  })
  const handleUpdate = (values) => {
    updateGroup({ variables: { id: group.id, input: values } })
  }
  return (
    <div className="group-update">
      <Divider size="sm" mb="20px" ml="-20px" mr="-20px" />
      <form onSubmit={form.onSubmit(handleUpdate)}>
        <TextInput {...form.getInputProps('name')} label="Group Name" />

        <TextInput
          value={group.leader?.name || group.leader?.email || ''}
          disabled
          label="Leader"
          variant="unstyled"
          styles={(theme) => ({
            wrapper: {
              backgroundColor: theme.white,
              borderRadius: 30,
            },
          })}
        />

        <SelectField
          value={leader}
          onSearchChange={setLeader}
          data={leaderSelect}
          label="New Leader (If Change)"
          {...form.getInputProps('userId')}
        />
        <button className="btn-upload">
          <ion-icon name="save-outline"></ion-icon>Save
        </button>
      </form>
    </div>
  )
}

export default GroupUpdateLeader
