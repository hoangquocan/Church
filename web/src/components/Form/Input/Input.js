import { InputField } from '@redwoodjs/forms'
import './Input.scss'

const Input = ({ name, type, placeholder }) => {

  return (
    <div className='form-input'>
      <InputField
      // autoFocus={autoFocus}
        type={type}
        name={name}
        validation={
          (name === 'email'
            ? {
                required: true,
                pattern: {
                  value: /[^@]+@[^.]+\..+/,
                  message: 'Please enter a valid email address',
                },
              }
            : { required: true })
        }
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input