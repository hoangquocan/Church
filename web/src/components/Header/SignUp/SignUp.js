import { PasswordInput, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery } from '@redwoodjs/web'
import { Redirect, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

import '../Login/Login.scss'
const CREATE_USER = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      email
    }
  }
`
const CREATE_USERROLE = gql`
  mutation CreateUserRole($input: CreateUserRoleInput!, $email: String) {
    createUserRole(input: $input, email: $email) {
      name
    }
  }
`
const QUERY_USER = gql`
  query UserQuery {
    users {
      email
    }
  }
`
const SignUp = ({ handleLogin }) => {
  const [createUser] = useMutation(CREATE_USER)
  const [createUserRole] = useMutation(CREATE_USERROLE, {
    onCompleted: () => {
      ;<Redirect to={routes.home()} />
    },
  })
  const { loading, error, data } = useQuery(QUERY_USER)

  let userExist = []
  if (data) {
    userExist = data.users.map((user) => user.email)
  }
  const { signUp } = useAuth()
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  })

  const handleSubmit = async (values) => {
    await signUp({ email: values.email, password: values.password })
      .then(async (userCredential) => {
        const user = userCredential.user
        const email = user.email
        if (!userExist.includes(email)) {
          await createUser({
            variables: { input: { email: email, avatar: '' } },
          })
          await createUserRole({
            variables: { input: { name: 'user' }, email },
          })
        }
        showNotification({
          color: 'blue',
          title: 'Welcome! User Created Success',
          icon: <ion-icon name="checkmark-outline"></ion-icon>,
          autoClose: 1500,
          radius: 'md',
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.blue[7],

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
        handleLogin()
      })
      .catch((error) => {
        showNotification({
          color: 'red',
          title: 'Notification',
          message: 'Email already exists! Please Sign Up with another Email',
          rd: 'md',
          autoClose: false,
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
        })
      })
  }

  return (
    <div className="signup-wrapper">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" {...form.getInputProps('email')} />
        <PasswordInput label="Password" {...form.getInputProps('password')} />
        <PasswordInput
          label="Confirm Password"
          {...form.getInputProps('confirmPassword')}
        />
        <div className="form-btn">
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
