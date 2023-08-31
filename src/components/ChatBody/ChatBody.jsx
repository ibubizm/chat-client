import { useEffect, useRef } from 'react'
import './ChatBody.css'
import { Message } from '../Message/Message'

export const ChatBody = ({
  messages,
  loading,
  removeMessage,
  editMessage,
  messageEndRef,
}) => {
  // const messagesEndRef = useRef(null)

  // useEffect(() => {
  //   if (loading) {
  //     messagesEndRef.current?.scrollIntoView({
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [messages])

  return (
    <>
      {!loading && (
        <div className="message__container">
          {messages.map((message, index) => (
            <Message
              key={message.text + index}
              message={message}
              removeMessage={removeMessage}
              editMessage={editMessage}
            />
          ))}
          <span ref={messageEndRef}></span>
        </div>
      )}
    </>
  )
}
