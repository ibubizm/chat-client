import { useState, useRef } from 'react'
import sendIcon from './send.svg'
import './ChatFooter.css'

export const ChatFooter = ({ sendMessage, roomUpdate }) => {
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
    const mes = {
      avatar: localStorage.getItem('avatar'),
      roomId: localStorage.getItem('roomId'),
      messageId: Math.random(),
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      text: message,
    }
    if (message !== '') {
      sendMessage(mes)
      roomUpdate(mes)
    } else {
      alert('empty')
    }
    setMessage('')
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
          placeholder="Введите свое сообщение здесь.."
          value={message}
          onKeyDown={onKey}
        />
        <button className="button__send">
          <img src={sendIcon} alt="" />
        </button>
      </form>
    </div>
  )
}
