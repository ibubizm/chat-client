import { useEffect, useRef, useState } from 'react'
import './ChatBody.css'
import { Message } from '../Message/Message'
import { ReplyMessage } from '../Message/ReplyMessage'

export const ChatBody = ({
  messages,
  loading,
  removeMessage,
  editMessage,
  scrollToMessage,
  replyFunc,
  selectEditMessage,
}) => {
  const messagesEndRef = useRef(null)
  // const messageRef = useRef(null)

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
                // messageRef={messageRef}
                message={message}
                removeMessage={removeMessage}
                editMessage={editMessage}
                replyFunc={replyFunc}
                selectEditMessage={selectEditMessage}
              />
            ) : (
              <ReplyMessage
                // messageRef={messageRef}
                scrollToMessage={scrollToMessage}
                key={message._id}
                replyFunc={replyFunc}
                removeMessage={removeMessage}
                editMessage={editMessage}
                message={message}
                messages={messages}
                selectEditMessage={selectEditMessage}
              />
            )
          )}

          <span ref={messagesEndRef}></span>
        </div>
      )}
    </>
  )
}
