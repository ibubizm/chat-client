import './message.css'
import { memo, useEffect, useState } from 'react'
import { timeFunc } from '../../halpers'
import useContextMenu from '../../hooks/useContextMenu'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Input } from '../input/input'
import { Button } from '../button/Button'
import { useSelector } from 'react-redux'
import { getImage } from '../../helpers/imageHalper'

export const Message = memo(({ message, removeMessage, editMessage }) => {
  const user = useSelector(({ toolkit }) => toolkit.user)
  const [toggleEdit, setToggleEdit] = useState(false)
  const [editValue, setEditValue] = useState(message.text)
  const [ava, setAva] = useState('')

  const { clicked, setClicked, points, setPoints } = useContextMenu()

  const onEdit = () => {
    editMessage({ ...message, text: editValue })
    setToggleEdit(false)
  }

  return (
    <div
      key={message.messageId}
      className={
        user._id === message.userId
          ? 'message__block my__message'
          : 'message__block'
      }
      onDoubleClick={(e) => {
        e.preventDefault()
        setClicked(true)
        setPoints({
          x: e.pageX,
          y: e.pageY,
        })
      }}
    >
      {message.author.avatar != undefined && (
        <img className="st" src={getImage(message.author.avatar)} />
      )}
      <div className={user._id === message.userId ? 'message my' : 'message'}>
        <span className="message__text">
          {toggleEdit ? (
            <>
              <Input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <div className="message__edit__btn">
                <Button
                  className={'sm'}
                  color={'cancel'}
                  onClick={() => setToggleEdit(false)}
                >
                  cancel
                </Button>
                <Button className={'sm'} color={'access'} onClick={onEdit}>
                  edit
                </Button>
              </div>
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
            onClick={() => setToggleEdit(true)}
          >
            <FaEdit />
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
      )}
    </div>
  )
})
