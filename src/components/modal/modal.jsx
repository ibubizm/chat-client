import './modal.css'
import { AiFillCloseCircle } from 'react-icons/ai'

export const Modal = ({ children, title, onClose }) => {
  return (
    <div onClick={onClose} className="modal">
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <div className="modal__close" onClick={onClose}>
            <AiFillCloseCircle />
          </div>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
