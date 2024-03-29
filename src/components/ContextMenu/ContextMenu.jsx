// import './contextMenu.css'
import { FaEdit } from 'react-icons/fa'
import { BsReplyFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

export const ContextMenu = ({
  message,
  removeMessage,
  replyFunc,
  points,
  setToggleEdit,
  messageRef,
}) => {
  return (
    <ul
      className="context__list"
      style={{ top: points.y + 'px', left: points.x + 'px' }}
    >
      <li
        className="context__list__item"
        onClick={() => setToggleEdit(message)}
      >
        <FaEdit />
        edit
      </li>
      <li
        className="context__list__item"
        onClick={() => replyFunc(message, messageRef)}
      >
        <BsReplyFill />
        replay
      </li>
      <li
        className="context__list__item"
        onClick={() => removeMessage(message)}
      >
        <MdDelete />
        delete
      </li>
    </ul>
  )
}
