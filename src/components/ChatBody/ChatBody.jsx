import { useEffect, useRef, useState } from 'react'
import './ChatBody.css'
import { Message } from '../Message/Message'
import { ReplyMessage } from '../Message/ReplyMessage'

export const ChatBody = ({
  messages,
  loading,
  removeMessage,
  editMessage,
  // messageEndRef,
  replyFunc,
  reply,
  closeReply,
  selectEditMessage,
}) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!loading && messages) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [messages])

  return (
    <>
      {!loading && (
        <div className="message__container">
          {messages.map((message, index) =>
            !message.replyId ? (
              <Message
                key={message.text + index}
                message={message}
                removeMessage={removeMessage}
                editMessage={editMessage}
                replyFunc={replyFunc}
                selectEditMessage={selectEditMessage}
              />
            ) : (
              <ReplyMessage
                key={message._id}
                replyFunc={replyFunc}
                removeMessage={removeMessage}
                editMessage={editMessage}
                message={message}
                messages={messages}
                selectEditMessage={selectEditMessage}
              />
              // messages.find((mes) => mes._id == message.replyId)
              // <div key={message._id}>
              //   <span>{message.replyId}</span>
              //   <Message
              //     key={message.text + index}
              //     message={message}
              //     removeMessage={removeMessage}
              //     editMessage={editMessage}
              //     replyFunc={replyFunc}
              //   />
              // </div>
            )
          )}

          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  )
}
