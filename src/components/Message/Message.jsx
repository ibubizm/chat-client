import './message.css'
import { memo, useRef } from 'react'
import { timeFunc } from '../../helpers/halpers'
import useContextMenu from '../../hooks/useContextMenu'
import { useSelector } from 'react-redux'
import { getImage } from '../../helpers/imageHalper'
import { ContextMenu } from '../ContextMenu/ContextMenu'

export const Message = memo(
  ({ message, removeMessage, replyFunc, selectEditMessage }) => {
    const user = useSelector(({ userReducer }) => userReducer.user)
    const { clicked, setClicked, points, setPoints } = useContextMenu()

    const messageRef = useRef()

    return (
      <div
        ref={messageRef}
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
        {message.author.avatar && (
          <img
            className="message__author__avatar"
            src={getImage(message.author.avatar)}
          />
        )}
        <div className={user._id === message.userId ? 'message my' : 'message'}>
          <span
            className={
              user._id === message.userId
                ? 'message__author__invisible'
                : 'message__author'
            }
          >
            {message.author.userName}
          </span>
          <span className="message__text">{message.text}</span>

          {message.updated ? (
            <div className="message__footer">
              <span className="message__time">Edited</span>
              <span className="message__time">
                {timeFunc(message.createdAt)}
              </span>
            </div>
          ) : (
            <span className="message__time">{timeFunc(message.createdAt)}</span>
          )}
        </div>
        {clicked && (
          <ContextMenu
            messageRef={messageRef}
            message={message}
            removeMessage={removeMessage}
            replyFunc={replyFunc}
            points={points}
            setToggleEdit={selectEditMessage}
          />
        )}
      </div>
    )
  }
)
