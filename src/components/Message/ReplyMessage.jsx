import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import useContextMenu from '../../hooks/useContextMenu'

export const ReplyMessage = memo(
  ({ message, messages, removeMessage, editMessage, replyFunc }) => {
    const [rep, setRep] = useState({})
    const [authorRep, setAuthorRep] = useState({})
    const user = useSelector(({ userReducer }) => userReducer.user)
    const { clicked, setClicked, points, setPoints } = useContextMenu()

    useEffect(() => {
      const reply = messages.find((mes) => mes._id === message.replyId)
      if (reply) {
        setAuthorRep(reply.author)
        setRep(reply)
      } else {
        removeMessage(message)
      }
    }, [])
    return (
      <div
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
          <div className="reply__block">
            <span className="reply__userName">{authorRep.userName}</span>
            <span className="reply__message">{rep.text}</span>
          </div>
          {rep ? <div>{message.text}</div> : 'message deleted'}
        </div>
        {clicked && (
          <ContextMenu
            message={message}
            removeMessage={removeMessage}
            replyFunc={replyFunc}
            points={points}
          />
        )}
      </div>
    )
  }
)
