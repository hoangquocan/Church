import './Button.scss'

const Button = ({ children, btn_size }) => {
  const classes = ['btn_wrapper', btn_size]
  return (
      <button className={classes.join(' ')}>{children}</button>
  )
}

export default Button