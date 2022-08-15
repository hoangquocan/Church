import { Label, Form, FieldError } from '@redwoodjs/forms'
import Input from 'src/components/Form/Input'
import Button from 'src/components/Form/Button'
import './GroupForm.scss'
const GroupForm = (props) => {
  const handleSubmit = (data) => {
    props.onSave(data)
  }

  return (
    <div className="group-form">
      <Form
        onSubmit={handleSubmit}
        config={{ mode: 'onBlur' }}
        error={props.error}
      >
        <Label name="name">Name</Label>
        <Input type="text" name="name" placehoder="Hội Thánh + Tên Nhóm" />
        <FieldError name='name'/>

        <Label name="leader">Leader</Label>
        <Input type="text" name="leader" placeholder="Trưởng Nhóm" />
        <FieldError name='leader'/>

        <Button disable={props.loading} btn_size="large">Save</Button>
      </Form>
    </div>
  )
}

export default GroupForm
