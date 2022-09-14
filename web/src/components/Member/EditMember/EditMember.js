import { DatePicker } from '@mantine/dates'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'

import './EditMember.scss'
import '../../Member/MemberForm/MemberForm.scss'

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
const EditMember = ({ member }) => {
  const [value, setValue] = useState(new Date(member.birthDate))
  const [urlAvatar, setUrlAvatar] = useState(member.urlAvatar)
  const [isChoose, setIsChoose] = useState(false)
  const [nameAvatar, setNameAvatar] = useState('')

  const [updateMember, { loading, error }] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'teal',
        title: 'Thank You! Your Updated Has Been Saved',
        // icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.teal[7],

            '&::before': { backgroundColor: theme.teal },
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
      navigate(routes.members())
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
    const inputWithUrl = Object.assign(values, { urlAvatar }, {birthDate: value})
    updateMember({variables: { id: member.id, input:  inputWithUrl  }})
  }

  const onFileUpload = (response) => {
    setUrlAvatar(response.filesUploaded[0].url)
    setNameAvatar(response.filesUploaded[0].filename)
  }
  const handleImg = () => {
    setUrlAvatar(null)
    setNameAvatar(null)
  }
  return (
    <div className="edit-member">
    <h2 className="text-center">Update Member "{member.name}"</h2>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Name" {...form.getInputProps('name')} />

        <DatePicker
          allowFreeInput
          value={value}
          label="Date Of Birth"
          onChange={setValue}
        />

        <TextInput label="Phone Number" {...form.getInputProps('phoneNumber')} />

        <TextInput label="Email" {...form.getInputProps('email')} />

        <TextInput label="Address" {...form.getInputProps('address')} />

        <label>Avatar</label>
        <div className="member-form-imgpicker">
          <input
            type="button"
            onClick={() => setIsChoose(!isChoose)}
            value={nameAvatar}
          />
          <ion-icon name="image-outline"></ion-icon>
        </div>
        {isChoose && (
          <PickerInline
            apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
            onSuccess={onFileUpload}
          >
            <div
              style={{ display: urlAvatar ? 'none' : 'block', height: '300px' }}
            ></div>
          </PickerInline>
        )}
        {urlAvatar && (
          <div className="members-img">
            <img src={urlAvatar} />
            <input type="button" onClick={handleImg} value="Replace Avatar" />
          </div>
        )}
        <div className="form-btn-mantine">
          <Button type="submit">Save <ion-icon name="checkmark-circle-outline"></ion-icon></Button>
        </div>
      </form>
    </div>
  )
}

export default EditMember
