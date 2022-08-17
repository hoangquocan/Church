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
        <Input type="text" name="name" placeholder="Hội Thánh + Tên Nhóm" />
        <FieldError name="name" />

        <Label name="leader">Leader</Label>
        <Input type="text" name="leader" />
        <FieldError name="leader" />

        <div className="form-btn">
          <Button disable={props.loading} btn_size="large">
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default GroupForm
