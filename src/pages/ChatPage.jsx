import './ChatPage.css'
import { ChatBar } from '../components/ChatBar/ChatBar'
import { ChatBody } from '../components/ChatBody/ChatBody'
import { ChatFooter } from '../components/ChatFooter/ChatFooter'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import useChat from '../hooks/useChat'
import { useState } from 'react'

const ChatPage = () => {
  const { messages, users, sendMessage, rooms, setUser, user } = useChat()
  const [chatSelected, setChatSelected] = useState(false)
  const [currentRoom, setCurrentRoom] = useState({})

  const handlerRoom = (room) => {
    setChatSelected(true)
    setCurrentRoom(room)
    setUser({ ...user, roomId: room.roomId })
    localStorage.setItem('roomId', room.roomId)
  }

  return (
    <div className="chat">
      <ChatBar
        rooms={rooms}
        handlerRoom={handlerRoom}
        messages={messages}
        users={users}
      />
      <div
        className={
          chatSelected ? 'chat__main chat__main-selected' : 'chat__main'
        }
      >
        <ChatHeader
          currentRoom={currentRoom}
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
