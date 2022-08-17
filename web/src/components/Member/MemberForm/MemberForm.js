import { Label, Form, FormError, FieldError } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import DatePicker from 'src/components/Form/DatePicker/DatePicker'
import { useForm } from 'react-hook-form'
import './MemberForm.scss'

const MemberForm = (props) => {
  const { handleSubmit, control } = useForm()
  const onSubmit = (data, input) => {
    props.onSave(data, input)
  }
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
        <FieldError name="name"></FieldError>

        <Label name="birthDate">Birth Date</Label>
        <DatePicker name="birthDate" control={control} dateFormat="yyyy/MM/dd"/>
        <FieldError name="birthDate"></FieldError>

        <Label name="phoneNumber">Phone Number</Label>
        <Input type="text" name="phoneNumber" />
        <FieldError name="phoneNumber"></FieldError>

        <Label name="email">Email</Label>
        <Input type="email" name="email" placeholder="Example@gmail.com" />
        <FieldError name="email"></FieldError>

        <Label name="address">Address</Label>
        <Input type="text" name="address" placeholder="" />
        <FieldError name="adress"></FieldError>

        <div className='form-btn'>
          <Button disable={props.loading} btn_size="large">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default MemberForm
