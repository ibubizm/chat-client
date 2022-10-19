import './input.css'
import cn from 'classnames'

export const Input = ({ icon, ...props }) => {
  return (
    <input
      className={cn('input', {
        input__icon: icon,
      })}
      type="text"
      {...props}
    />
  )
}
