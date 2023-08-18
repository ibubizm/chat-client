import './button.css'

export const Button = ({ children, disabled, ...props }) => {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  )
}
