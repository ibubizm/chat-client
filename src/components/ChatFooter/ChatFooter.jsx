import { useState, useRef, useEffect } from 'react'
import sendIcon from './send.svg'
import './ChatFooter.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersRooms, updateUsersRooms } from '../../http'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export const ChatFooter = ({
  sendMessage,
  roomUpdate,
  scrollFunc,
  reply,
  closeReply,
}) => {
  const user = useSelector(({ userReducer }) => userReducer.user)
  const room = useSelector(({ roomReducer }) => roomReducer.currentRoom)
  const [message, setMessage] = useState('')
  const ref = useRef(null)

  const dispatch = useDispatch()

  const onKey = (e) => {
    ref.current.focus()
    let scHeight = ref.current.scrollHeight

    if (e.shiftKey && e.key === 'Enter') {
      ref.current.style.height = `${scHeight + 18}px`
    }
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }

    if (e.key === 'Backspace') {
      ref.current.style.height = `${scHeight - 18}px`
    }
  }

  const handleSendMessage = () => {
    if (message !== '') {
      const mes = {
        author: user._id,
        roomId: room._id,
        messageId: Math.random(),
        userId: user._id,
        text: message,
        replyId: reply._id,
      }
      scrollFunc()
      sendMessage(mes)
      dispatch(updateUsersRooms(room._id, message))
      closeReply()
      // roomUpdate(mes)
    } else {
      alert('empty')
    }
    setMessage('')
  }

  // useEffect(() => {
  //   dispatch(getUsersRooms(user._id))
  // }, [sendMessage])

  return (
    <div className="chat__footer">
      {reply.text && (
        <div className="reply">
          <span className="reply__text">{reply.text}</span>
          <AiOutlineCloseCircle onClick={closeReply} />
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSendMessage()
        }}
        className="form"
      >
        <textarea
          onChange={(e) => {
            setMessage(e.target.value)
            ref.current.focus()
          }}
          className="textarea"
          ref={ref}
          type="text"
          placeholder="Введите сообщение"
          value={message}
          onKeyDown={onKey}
        />
        <button className="button__send">
          <img className="send__icon" src={sendIcon} alt="" />
        </button>
      </form>
    </div>
  )
}
