import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'
import { PasswordInput, TextInput, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useEffect, useRef } from 'react'

import './Login.scss'
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
  query UsersExistQuery {
    usersExist {
      email
      group {
        id
      }
    }
  }
`
const Login = ({ handleLogin }) => {
  const { isAuthenticated, logIn, userMetadata } = useAuth()

  const [createUser] = useMutation(CREATE_USER)
  const [createUserRole] = useMutation(CREATE_USERROLE)
  const { loading, error, data } = useQuery(QUERY_USER)

  const usernameRef = useRef()
  const passwordRef = useRef()

  // useEffect(() => {
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => document.removeEventListener('click', handleClickOutside, true)
  // }, [])
  // const handleClickOutside = (e) => {
  //   // if (!usernameRef.current.contains(e.target)) {
  //   //   usernameRef.current.classList.remove('focus')
  //   // }
  // }
  let userExist = []
  if (data) {
    userExist = data.usersExist.map((user) => user.email)
  }
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid Email'),
    },
  })

  const onClick = async () => {
    const loginres = await logIn()
    const { user } = loginres
    const email = user.email
    localStorage.setItem('email', email)

    if (!userExist.includes(email)) {
      await createUser({
        variables: { input: { email: email, avatar: user.photoURL } },
      })
      await createUserRole({
        variables: { input: { name: 'user' }, email },
      })
    } else if (userExist.includes(email)) {
      const user = data.usersExist.find((user) => user.email == email).group?.id
      localStorage.setItem('groupId', user)
    }

    showNotification({
      color: 'blue',
      title: 'Welcome! Log In Success',
      autoClose: 3000,
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
    handleLogin()
  }

  const handleSubmit = async (values) => {
    await logIn({ email: values.email, password: values.password })
      .then((userCredential) => {
        localStorage.setItem('email', values.email)

        const groupId = data.usersExist.find(
          (user) => user.email == values.email
        ).group?.id
        console.log(groupId)
        localStorage.setItem('groupId', groupId)

        showNotification({
          color: 'blue',
          title: 'Welcome! Log In Success',
          autoClose: 3000,
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

        handleLogin()
      })
      .catch((error) => {
        showNotification({
          color: 'red',
          title: 'Fail to login!',
          message: 'Please check your account!',
          rd: 'md',
          autoClose: false,
          styles: (theme) => ({
            root: {
              borderColor: theme.colors.red[7],
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
      })
  }

  const handleEmail = () => {
    usernameRef.current.classList.add('focus')
  }
  const handlePassword = () => {
    passwordRef.current.classList.add('focus')
  }

  return (
    <div className="modal-login">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="inputLogin" onFocus={handleEmail}>
          <TextInput variant="unstyled" {...form.getInputProps('email')} />
          <label ref={usernameRef}>Email</label>
        </div>
        <div className="inputLogin" onFocus={handlePassword}>
          <PasswordInput
            variant="unstyled"
            {...form.getInputProps('password')}
          />
          <label ref={passwordRef}>Password</label>
        </div>
        <button className="btn-purple" type="submit">
          Sign In
        </button>
      </form>
      <Divider
        my="md"
        label="OR"
        labelPosition="center"
        color="#fff"
        mt={30}
        mb={30}
      />
      <button onClick={onClick} type="button" className="login-with-google-btn">
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
