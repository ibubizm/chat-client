import { useState, useRef } from 'react'
import sendIcon from './send.svg'
import './ChatFooter.css'
import { useSelector } from 'react-redux'

export const ChatFooter = ({ sendMessage, roomUpdate, scrollFunc }) => {
  const user = useSelector(({ toolkit }) => toolkit.user)
  const room = useSelector(({ room }) => room.currentRoom)
  const [message, setMessage] = useState('')
  const ref = useRef(null)

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
      }
      if (message !== '') {
        scrollFunc()
        sendMessage(mes)
        roomUpdate(mes)
      } else {
        alert('empty')
      }
      setMessage('')
    }
  }

  return (
    <div className="chat__footer">
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
