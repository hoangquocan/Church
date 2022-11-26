import { Image, Divider } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useMutation } from "@redwoodjs/web"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from 'src/App'

const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      avatar
    }
  }
`

const EditUserAvatar = ({file, user ,handleModal}) => {
  // const [percent, setPercent] = useState(0)
  const [updateUser] = useMutation(UPDATE_USER_AVATAR, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! Your Updated Has Been Saved',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue,
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
      }),
         handleModal()
    },
  })
   const handleUpload = () => {
      const metadata = {
        contentType: 'image/jpeg',
      }
      const storageRef = ref(storage, `/images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          // setPercent(percent)
        },
        (err) =>
          showNotification({
            color: 'red',
            title: 'Error! Please Try Again',
            rd: 'md',
            autoClose: 3000,
            styles: (theme) => ({
              root: {
                borderColor: theme.colors.red[7],
                backgroundColor: theme.colors.red[1],
                '&::before': { backgroundColor: theme.red },
              },
              title: {
                color: theme.colors.red[5],
              },
              closeButton: {
                color: theme.colors.gray[7],
                '&:hover': {
                  color: theme.white,
                  backgroundColor: theme.colors.gray[6],
                },
              },
            }),
          }),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            updateUser({
              variables: { id: user.id, input: { avatar: url } },
            })
          })
        }
      )
  }
  return (
    <div>
    <Divider size="sm" mb="30px" ml={-20} mr={-20} />
      {file && (
        <Image
          src={file.preview}
          height={320}
          width={320}
          fit='contain'
          withPlaceholder
          m="40px auto"
        />
      )}
      <button className="btn-upload" onClick={handleUpload}>
        <ion-icon name="cloud-upload-outline"></ion-icon>Upload
      </button>
    </div>
  )
}

export default EditUserAvatar
