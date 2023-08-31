import { Input } from '../input/input'
import { Modal } from '../modal/modal'
import { RoomItem } from '../RoomItem/RoomItem'
import './ChatBar.css'
import { useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { SettingsMenu } from '../SettingsMenu/SettingsMenu'

export const ChatBar = ({ rooms, handlerRoom, createUser, createRoom }) => {
  const [input, setInput] = useState('')
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }

  const onClose = () => {
    setModal(false)
  }

  const filtredRooms = rooms.filter((room) =>
    room.roomId.toLowerCase().includes(input.toLowerCase())
  )
  filtredRooms.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

  return (
    <div className="chat__sidebar">
      <div className="label">
        <div className="label__detail">
          <h2 className="logo">IBUChat</h2>
          <AiFillSetting className="setting-icon" onClick={openModal} />
        </div>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          icon={true}
          placeholder={'Поиск'}
        />
      </div>
      <div className="chat__rooms">
        {filtredRooms.length > 0 ? (
          filtredRooms.map((room) => (
            <RoomItem key={room.roomId} room={room} handlerRoom={handlerRoom} />
          ))
        ) : (
          <div className="chat__empty">Пусто...</div>
        )}
      </div>
      {modal && (
        <Modal title={'setting'} onClose={onClose}>
          <SettingsMenu
            createUser={createUser}
            createRoom={createRoom}
            onClose={onClose}
          />
        </Modal>
      )}
    </div>
  )
}
