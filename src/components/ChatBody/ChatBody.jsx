import { useEffect, useRef } from 'react'
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
