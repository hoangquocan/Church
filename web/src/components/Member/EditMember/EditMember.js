import { DatePicker } from '@mantine/dates'
import { TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState, useRef } from 'react'
import { navigate, routes, redirect } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'

import './EditMember.scss'
import '../../Member/MemberForm/MemberForm.scss'
import EditAvatar from 'src/components/EditAvatar/EditAvatar'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      name
      birthDate
      phoneNumber
      email
      address
      urlAvatar
    }
  }
`
const EditMember = ({ member, handleModal, idx }) => {
  const [value, setValue] = useState(new Date(member.birthDate))
  const [urlAvatar, setUrlAvatar] = useState(member.urlAvatar)
  const [isChoose, setIsChoose] = useState(true)

  const iconCancelRef = useRef()
  const [updateMember, { loading, error }] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! Your Updated Has Been Saved',
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
    },
  })

  const form = useForm({
    initialValues: {
      name: member.name,
      email: member.email,
      phoneNumber: member.phoneNumber,
      address: member.address,
    },
  })
  const handleSubmit = (values) => {
    const inputWithUrl = Object.assign(values, { birthDate: value })
    updateMember({ variables: { id: member.id, input: inputWithUrl } })
  }

  const handleImg = () => {
    setUrlAvatar(null)
    setIsChoose(true)
  }

  const handleModalUpload = () => {
    iconCancelRef.current.classList.toggle('canceled')
    setIsChoose(!isChoose)
    setUrlAvatar(member.urlAvatar)
  }

  return (
    <div className="member-form">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Full Name" {...form.getInputProps('name')} />

        <DatePicker
          allowFreeInput
          value={value}
          label="Date Of Birth"
          onChange={setValue}
        />

        <TextInput
          label="Phone Number"
          {...form.getInputProps('phoneNumber')}
        />

        <TextInput label="Email" {...form.getInputProps('email')} />

        <TextInput label="Address" {...form.getInputProps('address')} />

        <label>
          Avatar
          {!urlAvatar && (
            <div
              className="avatar-cancel-choosefile"
              style={{
                height: '24px',
                color: '#fff',
                width: '24px',
                position: 'absolute',
                content: '',
              }}
            >
              <ion-icon
                ref={iconCancelRef}
                onClick={() => handleModalUpload()}
                name="close-outline"
              ></ion-icon>
            </div>
          )}
        </label>

        {!urlAvatar && isChoose && <EditAvatar member={member} />}

        {urlAvatar && (
          <div className="members-img">
            <img src={urlAvatar} />
            <input type="button" onClick={handleImg} value="Replace Avatar" />
          </div>
        )}
        <div className="form-btn">
          <Button type="submit">
            Save <ion-icon name="checkmark-circle-outline"></ion-icon>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditMember
