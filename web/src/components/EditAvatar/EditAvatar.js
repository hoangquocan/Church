import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import { storage } from 'src/App'
import { Image, Divider, Progress } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

import './EditAvatar.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberAvatar($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      urlAvatar
    }
  }
`
const EditAvatar = ({ member, handleModal, idx, handleCloseModal }) => {
  const [file, setFile] = useState('')
  const [percent, setPercent] = useState(0)
  const [viewProgress, setViewProgress] = useState(false)
  const [updateMember, {loading}] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! Avatar Has Been Uploaded',
        autoClose: 4000,
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
        handleModal && handleModal(idx)
        handleCloseModal && handleCloseModal()
    },
  })
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview)
    }
  }, [file])

  const handleChange = (e) => {
    const avatar = e.target.files[0]
    avatar.preview = URL.createObjectURL(avatar)
    setFile(avatar)
  }

  const handleUpload = () => {
    if (!file) {
      showNotification({
        color: 'red',
        title: 'Notification! Please Select One Picture First',
        rd: 'md',
        autoClose: 3000,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[7],
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
    } else {
      setViewProgress(!viewProgress)
      const metadata = {
        contentType: 'image/jpeg',
      }
      const storageRef = ref(storage, `/images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percentLoad = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setPercent(percentLoad)
        },
        (err) =>
          showNotification({
            color: 'red',
            title: 'Error! Please Try Again',
            rd: 'md',
            autoClose: 4000,
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
            updateMember({
              variables: { id: member.id, input: { urlAvatar: url } },
            })
          })
        }
      )
    }
  }
  return (
    <div className="edit-avatar-wrapper">
      <Divider size="sm" mb="30px" />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleChange(e)}
        onClick={(e) => (e.target.value = '')}
        required
      />
      {file && (
        <Image
          src={file.preview}
          height={300}
          width={366}
          fit='contain'
          withPlaceholder
          m=" 0 auto 30px"
        />
      )}
      <button type='button' className="btn-upload" onClick={handleUpload}>
        <ion-icon name="cloud-upload-outline"></ion-icon>Upload
      </button>
      {viewProgress && (
        <Progress mb={20} radius="xl" size="lg" value={percent} striped animate />
      )}
      <Divider size="sm" mb="20px"/>
    </div>
  )
}

export default EditAvatar
