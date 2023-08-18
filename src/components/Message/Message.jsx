import './message.css'
import { memo, useState } from 'react'
import { timeFunc } from '../../halpers'
import useContextMenu from '../../hooks/useContextMenu'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export const Message = memo(({ message, removeMessage, editMessage }) => {
  const [toggleEdit, setToggleEdit] = useState(false)
  const [editValue, setEditValue] = useState(message.text)

  const { clicked, setClicked, points, setPoints } = useContextMenu()

  const onEdit = () => {
    editMessage({ ...message, text: editValue })
    setToggleEdit(false)
  }

  return (
    <div
      key={message.messageId}
      className={
        localStorage.getItem('userId') === message.userId
          ? 'message__block my__message'
          : 'message__block'
      }
      onContextMenu={(e) => {
        e.preventDefault()
        setClicked(true)
        setPoints({
          x: e.pageX,
          y: e.pageY,
        })
      }}
    >
      <img className="st" src={message.avatar} />
      <div
        className={
          localStorage.getItem('userId') === message.userId
            ? 'message my'
            : 'message'
        }
      >
        <span className="message__text">
          {toggleEdit ? (
            <>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => setToggleEdit(false)}>cancel</button>
              <button onClick={onEdit}>edit</button>
            </>
          ) : (
            message.text
          )}
        </span>

        {message.updated ? (
          <div className="message__footer">
            <span className="message__time">chenged</span>
            <span className="message__time">{timeFunc(message.createdAt)}</span>
          </div>
        ) : (
          <span className="message__time">{timeFunc(message.createdAt)}</span>
        )}
      </div>
      {clicked && (
        <ul
          className="context__list"
          style={{ top: points.y + 'px', left: points.x + 'px' }}
        >
          <li
            className="context__list__item"
            onClick={() => setToggleEdit(true)}
          >
            <FaEdit />
            edit
          </li>
          <li
            className="context__list__item"
            onClick={() => removeMessage(message)}
          >
            <MdDelete />
            delete
          </li>
        </ul>
      )}
    </div>
  )
})
