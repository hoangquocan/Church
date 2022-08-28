import { Label, Form, FormError, FieldError } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import DatePicker from 'src/components/Form/DatePicker/DatePicker'

import { useForm } from 'react-hook-form'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'

import './MemberForm.scss'

const MemberForm = (props) => {
  const [urlAvatar, setUrlAvatar] = useState('')
  const [isChoose, setIsChoose] = useState(false)
  const [nameAvatar, setNameAvatar] = useState('')
  const { handleSubmit, control } = useForm()

  const onSubmit = (data, input) => {
    const inputWithUrl = Object.assign(input, { ...data }, { urlAvatar })
    props.onSave(inputWithUrl)
  }

  const onFileUpload = (response) => {
    setUrlAvatar(response.filesUploaded[0].url)
    setNameAvatar(response.filesUploaded[0].filename)
  }
  const handleImg = () => {
    setUrlAvatar(null)
    setNameAvatar(null)
  }
  console.log(props.member.name)
  return (
    <div className="member-form">
      <Form
        onSubmit={handleSubmit(onSubmit)}
        config={{ mode: 'onBlur' }}
        error={props.error}
      >
        <FormError error={props.error} />
        <Label name="name">Full Name</Label>
        <Input type="text" name="name" />
        <FieldError name="name" className="error"></FieldError>

        <Label name="birthDate">Birth Date</Label>
        <DatePicker
          name="birthDate"
          control={control}
          dateFormat="yyyy/MM/dd"
        />
        <FieldError name="birthDate"></FieldError>

        <Label name="phoneNumber">Phone Number</Label>
        <Input type="text" name="phoneNumber" />
        <FieldError name="phoneNumber" className="error"></FieldError>

        <Label name="email">Email</Label>
        <Input type="email" name="email" />
        <FieldError name="email" className="error"></FieldError>

        <Label name="address">Address</Label>
        <Input type="text" name="address" />
        <FieldError name="address" className="error"></FieldError>

        <Label name="urlAvatar">
          Avatar<span> (Not required, you can update later)</span>
        </Label>
        <div className="member-form-imgpicker">
          <input
            type="button"
            onClick={() => setIsChoose(isChoose == false ? true : false)}
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
        <div className="form-btn">
          <Button disable={props.loading} btn_size="large">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default MemberForm
