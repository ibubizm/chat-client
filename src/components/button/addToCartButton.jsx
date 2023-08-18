import './button.scss'
import { GiCardboardBoxClosed } from 'react-icons/gi'
import { HiShoppingCart } from 'react-icons/hi'

export const AddToCartButton = ({ isClicked, ...props }) => {
  return (
    <span
      className={isClicked ? 'cart__button clicked' : 'cart__button'}
      {...props}
    >
      <span className={'add__to__cart'}>add</span>
      <HiShoppingCart className="fa-shopping-cart" />
      <GiCardboardBoxClosed className="fa-box" />
    </span>
  )
}
