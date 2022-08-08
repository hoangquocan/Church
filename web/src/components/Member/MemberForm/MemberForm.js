import { Label, Form, FormError, FieldError } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import './MemberForm.scss'

const MemberForm = (props) => {
  const handleSubmit = (data) => {
    props.onSave(data)
  }
  return (
    <div className="member-form">
      <Form
        onSubmit={handleSubmit}
        config={{ mode: 'onBlur' }}
        error={props.error}
      >
        <FormError error={props.error} />
        <Label name="name">Full Name</Label>
        <Input type="text" name="name" placeholder="Full Name" />
        <FieldError name="name"></FieldError>

        <Label name="birthDate">Birth Date</Label>
        <Input type="date" name="birthDate" placeholder="YYYY/MM/DD" />
        <FieldError name="birthDate"></FieldError>

        <Label name="phoneNumber">Phone Number</Label>
        <Input type="text" name="phoneNumber" placeholder="Phone Number" />
        <FieldError name="phoneNumber"></FieldError>

        <Label name="email">Email</Label>
        <Input type="email" name="email" placeholder="Example@gmail.com" />
        <FieldError name="email"></FieldError>

        <Label name="address">Address</Label>
        <Input type="text" name="address" placeholder="" />
        <FieldError name="adress"></FieldError>

        <div>
          <Button disable ={props.loading}  btn_size='large'>Save</Button>
        </div>
      </Form>
    </div>
  )
}

export default MemberForm
