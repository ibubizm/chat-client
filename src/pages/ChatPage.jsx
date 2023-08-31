import './ChatPage.css'
import { ChatBar } from '../components/ChatBar/ChatBar'
import { ChatBody } from '../components/ChatBody/ChatBody'
import { ChatFooter } from '../components/ChatFooter/ChatFooter'
import { ChatHeader } from '../components/ChatHeader/ChatHeader'
import useChat from '../hooks/useChat'
import { useRef, useState } from 'react'
import { Loader } from '../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setRoom } from '../components/redux/roomReducer'

const ChatPage = () => {
  const {
    messages,
    sendMessage,
    roomUpdate,
    rooms,
    loading,
    removeMessage,
    editMessage,
    createUser,
    createRoom,
  } = useChat()
  const [chatSelected, setChatSelected] = useState(false)

  const dispatch = useDispatch()
  const { currentRoom } = useSelector(({ room }) => room)

  const messageEndRef = useRef()
  const handlerRoom = (room) => {
    setChatSelected(true)
    dispatch(setRoom(room))
  }

  const scrollFunc = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <div className="chat">
      <ChatBar
        rooms={rooms}
        handlerRoom={handlerRoom}
        createUser={createUser}
        createRoom={createRoom}
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
        {!loading && chatSelected ? (
          <>
            <ChatBody
              messageEndRef={messageEndRef}
              room={currentRoom}
              messages={messages}
              removeMessage={removeMessage}
              loading={loading}
              editMessage={editMessage}
            />
            <ChatFooter
              sendMessage={sendMessage}
              roomUpdate={roomUpdate}
              scrollFunc={scrollFunc}
            />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default ChatPage
