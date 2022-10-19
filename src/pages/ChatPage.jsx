import './ChatPage.css'
import { ChatBar } from '../components/ChatBar/ChatBar'
import { ChatBody } from '../components/ChatBody/ChatBody'
import { ChatFooter } from '../components/ChatFooter/ChatFooter'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import useChat from '../hooks/useChat'
import { useState } from 'react'

const ChatPage = () => {
  const { messages, users, sendMessage } = useChat()
  const [chatSelected, setChatSelected] = useState(false)

  const handlerRoom = (roomId) => {
    setChatSelected(true)
    localStorage.setItem('roomId', roomId)
    // window.location.reload()
  }

  return (
    <div className="chat">
      <ChatBar handlerRoom={handlerRoom} messages={messages} users={users} />
      <div
        // className="chat__main"
        className={
          chatSelected ? 'chat__main chat__main-selected' : 'chat__main'
        }
      >
        <ChatHeader
          setChatSelected={setChatSelected}
          chatSelected={chatSelected}
        />
        <ChatBody messages={messages} />
        <ChatFooter sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatPage
