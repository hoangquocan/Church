import { PasswordInput, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useMutation, useQuery } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useRef } from 'react'

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
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [createUser] = useMutation(CREATE_USER)
  const [createUserRole] = useMutation(CREATE_USERROLE)
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
  const handleEmail = () => {
    console.log(emailRef.current)
    emailRef.current.classList.add('focus')
  }
  const handlePassword = () => {
    passwordRef.current.classList.add('focus')
  }
  const handleCfPassword = () => {
    confirmPasswordRef.current.classList.add('focus')
  }

  return (
    <div className="modal-login">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="inputLogin" onClick={handleEmail}>
          <TextInput variant="unstyled" {...form.getInputProps('email')} />
          <label ref={emailRef}>Email</label>
        </div>
        <div className="inputLogin" onClick={handlePassword}>
          <PasswordInput
            variant="unstyled"
            {...form.getInputProps('password')}
          />
          <label ref={passwordRef}>Password</label>
        </div>
        <div className="inputLogin" onClick={handleCfPassword}>
          <PasswordInput
            variant="unstyled"
            {...form.getInputProps('confirmPassword')}
          />
          <label ref={confirmPasswordRef}>Comfirm Password</label>
        </div>
        <div className="btn-cyan">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
