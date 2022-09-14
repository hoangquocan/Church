import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'
import { PasswordInput, TextInput, Button, Divider } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
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
    }
  }
`
const Login = ({ handleLogin }) => {
  const { isAuthenticated, logIn, userMetadata } = useAuth()

  const [createUser] = useMutation(CREATE_USER)
  const [createUserRole] = useMutation(CREATE_USERROLE)
  const { loading, error, data } = useQuery(QUERY_USER)

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
    if (!userExist.includes(email)) {
      await createUser({
        variables: { input: { email: email, avatar: user.photoURL } },
      })
      await createUserRole({
        variables: { input: { name: 'user' }, email },
      })
    }

    showNotification({
      color: 'blue',
      title: 'Welcome! Log In Success',
      // icon: <ion-icon name="checkmark-outline"></ion-icon>,
      autoClose: 1800,
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
  }

  const handleSubmit = async (values) => {
    await logIn({ email: values.email, password: values.password })
      .then((userCredential) => {
        showNotification({
          color: 'blue',
          title: 'Welcome! Log In Success',
          // icon: <ion-icon name="checkmark-outline"></ion-icon>,
          autoClose: 1800,
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
          title: 'Fail to login!',
          message: 'Please check your account!',
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
    <div className="modal-login">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" {...form.getInputProps('email')} />
        <PasswordInput label="Password" {...form.getInputProps('password')} />
        <div className='form-btn'><Button type="submit">Sign In</Button></div>
      </form>
      <Divider my="md" label="OR" labelPosition="center" />
      <button onClick={onClick} type="button" className="login-with-google-btn">
        Sign in with Google
      </button>
      {/* <Divider size="sm" mt="20px" ml="-40px" /> */}
    </div>
  )
}

export default Login
