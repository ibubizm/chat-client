import { useEffect, useRef } from 'react'
import './ChatBody.css'

export const ChatBody = ({ messages }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <>
      <div className="message__container">
        {messages.map((message) => (
          <div
            key={message.messageId}
            className={
              localStorage.getItem('userId') === message.userId
                ? 'message__block my__message'
                : 'message__block'
            }
          >
            <img className="st" src={message.avatar} />
            <div
              className={
                localStorage.getItem('userId') === message.userId
                  ? 'message my'
                  : 'message'
              }
            >
              <span className="message__text"> {message.text}</span>
              <span className="message__time">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <span ref={messagesEndRef}></span>
      </div>
    </>
  )
}
