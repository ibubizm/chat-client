import './input.css'
import cn from 'classnames'

export const Input = ({ value, icon, ...props }) => {
  return (
    <input
      value={value}
      className={cn('input', {
        input__icon: icon,
      })}
      type="text"
      {...props}
    />
  )
}
