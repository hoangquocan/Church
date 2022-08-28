import './Button.scss'

const Button = ({ children, btn_size }) => {
  const classes = ['btn_wrapper', btn_size]
  return (
    <button className={classes.join(' ')}>
      {children}
      <ion-icon name="checkmark-circle-outline"></ion-icon>
    </button>
  )
}

export default Button
