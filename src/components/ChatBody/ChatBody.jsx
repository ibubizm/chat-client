import { useEffect, useRef } from 'react'
import './ChatBody.css'
import { Message } from './Message'

export const ChatBody = ({ messages, loading, removeMessage, editMessage }) => {
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <>
      {!loading && (
        <div className="message__container">
          {messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              removeMessage={removeMessage}
              editMessage={editMessage}
            />
          ))}
          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  )
}
