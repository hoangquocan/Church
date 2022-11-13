import { useMutation, useQuery } from '@redwoodjs/web'
import { useState, useMemo } from 'react'
import { Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'

import SelectField from 'src/components/Form/SelectField/SelectField'
import './SetRoles.scss'

import 'src/components/Attendance/Attendance/Attendance.scss'
const ADMIN_CREATE_USERROLE = gql`
  mutation AdminCreateUserRole($input: CreateUserRoleInput!, $email: String) {
    createUserRole(input: $input, email: $email) {
      name
    }
  }
`

const QUERY_USERS = gql`
  query UsersQuery {
    users {
      id
      name
      email
      userRoles {
        name
      }
    }
  }
`
const SetRoles = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [createUserRole, { loading }] = useMutation(ADMIN_CREATE_USERROLE, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! User has been updated Role',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[9],
            backgroundColor: theme.colors.blue[2],
            '&::before': { backgroundColor: theme.blue },
          },

          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    },
    refetchQueries: [{ query: QUERY_USERS }],
  })

  const { loading: loadingUsers, error, data } = useQuery(QUERY_USERS)
  // if (loading) return 'Loading...'
  // if (error) return `Error! ${error.message}`
  let users = []
  if (data) {
    users = data.users
  }
  const dataSelect = users.map((user) => ({
    value: user.email,
    label: user.name || user.email,
    roles: user.userRoles,
  }))
  const rolesSelect = [
    { key: 1, value: 'manager', label: 'MANAGER' },
    { key: 2, value: 'leader', label: 'LEADER' },
    { key: 3, value: 'user', label: 'USER' },
    { key: 4, value: 'admin', label: 'ADMIN' },
  ]
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
    },
    validate: {
      email: (value) =>
        dataSelect.some((item) => item.label === email)
          ? null
          : 'Please Choose One Email Of User',
      name: (value) =>
        rolesSelect.some((item) => item.label === role)
          ? null
          : 'Please Choose One Role Of User',
    },
  })
  const findRole = useMemo(() => {
    const index = dataSelect.findIndex((item) => item.value === email)
    if (index >= 0) {
      const roleValue = rolesSelect
        .filter((item) => item.label === role)
        .map((item) => item.value)
        .toString()
      const roleExist = dataSelect[index].roles.findIndex(
        (item) => item.name === roleValue
      )
      return roleExist
    }
  }, [role, email])

  const handleSubmit = (values) => {
    if (findRole < 0) {
      openConfirmModal({
        title: ' Do you want to add this Role?',
        children: <p>User can also has another Role!</p>,
        labels: { confirm: 'Yes', cancel: 'Cancel' },
        onConfirm: () => {
          createUserRole({
            variables: { input: { name: values.name }, email: values.email },
          }),
            form.reset()
        },
      })
    } else {
      showNotification({
        color: 'red',
        title: 'Notification!',
        message: 'This User has been create that Role',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[8],
            backgroundColor: theme.colors.red[2],
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
      })
    }
  }

  return (
    <div className="admin-setroles">
      <h2 className='text-center'>Set Role For User</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <SelectField
          label="Select User"
          value={email}
          onSearchChange={setEmail}
          data={dataSelect}
          {...form.getInputProps('email')}
        />
        <SelectField
          label="Select Role"
          value={role}
          onSearchChange={setRole}
          data={rolesSelect}
          {...form.getInputProps('name')}
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

export default SetRoles
