import './button.css'

export const Button = ({ className, children, color, ...props }) => {
  return (
    <button
      className={className ? `btn ${className} ${color}` : 'btn'}
      {...props}
    >
      {children}
    </button>
  )
}
