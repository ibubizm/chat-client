import './ChatPage.css'
import { ChatBar } from '../components/ChatBar/ChatBar'
import { ChatBody } from '../components/ChatBody/ChatBody'
import { ChatFooter } from '../components/ChatFooter/ChatFooter'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import useChat from '../hooks/useChat'
import { useState } from 'react'
import { Loader } from '../components/Loader/Loader'

const ChatPage = () => {
  const {
    messages,
    sendMessage,
    roomUpdate,
    rooms,
    loading,
    removeMessage,
    editMessage,
  } = useChat()
  const [chatSelected, setChatSelected] = useState(false)
  const [currentRoom, setCurrentRoom] = useState({
    roomId: localStorage.getItem('roomId'),
    roomAvatar: localStorage.getItem('roomAvatar'),
  })

  const handlerRoom = (room) => {
    setChatSelected(true)
    setCurrentRoom(room)
    localStorage.setItem('roomId', room.roomId)
    localStorage.setItem('roomAvatar', room.roomAvatar)
  }

  return (
    <div className="chat">
      <ChatBar rooms={rooms} handlerRoom={handlerRoom} />
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
        {!loading && currentRoom.roomId !== null ? (
          <>
            <ChatBody
              messages={messages}
              removeMessage={removeMessage}
              loading={loading}
              editMessage={editMessage}
            />
            <ChatFooter sendMessage={sendMessage} roomUpdate={roomUpdate} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default ChatPage
