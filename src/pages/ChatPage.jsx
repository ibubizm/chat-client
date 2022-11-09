import './ChatPage.css'
import { ChatBar } from '../components/ChatBar/ChatBar'
import { ChatBody } from '../components/ChatBody/ChatBody'
import { ChatFooter } from '../components/ChatFooter/ChatFooter'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import useChat from '../hooks/useChat'
import { useState } from 'react'

const ChatPage = () => {
  const {
    messages,
    sendMessage,
    rooms,
    setUser,
    user,
    removeMessage,
    roomsTest,
    createRoom,
  } = useChat()
  const [chatSelected, setChatSelected] = useState(false)
  const [currentRoom, setCurrentRoom] = useState({
    roomId: localStorage.getItem('roomId'),
    roomAvatar: localStorage.getItem('roomAvatar'),
  })

  const handlerRoom = (room) => {
    setChatSelected(true)
    setCurrentRoom(room)
    setUser({ ...user, roomId: room.roomId })
    localStorage.setItem('roomId', room.roomId)
    localStorage.setItem('roomAvatar', room.roomAvatar)
  }

  const test = () => {
    createRoom({
      roomId: 'ibubizm',
      roomAvatar:
        'https://culturedvultures.com/wp-content/uploads/2021/11/F-Is-For-Family-S5.jpg',
      lastMessage: '',
    })
  }

  return (
    <div className="chat">
      <ChatBar rooms={roomsTest} handlerRoom={handlerRoom} />
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
        <ChatBody messages={messages} removeMessage={removeMessage} />
        <ChatFooter sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatPage
