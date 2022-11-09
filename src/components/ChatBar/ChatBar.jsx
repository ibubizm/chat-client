import { Input } from '../input/input'
import { RoomItem } from '../RoomItem/RoomItem'
import './ChatBar.css'
import { useState } from 'react'

export const ChatBar = ({ rooms, handlerRoom }) => {
  const [input, setInput] = useState('')

  const filtredRooms = rooms.filter((room) =>
    room.roomId.toLowerCase().includes(input.toLowerCase())
  )

  return (
    <div className="chat__sidebar">
      <div>
        <div className="label">
          <h2 className="logo">IBUChat</h2>
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
              <RoomItem
                key={room.roomId}
                room={room}
                handlerRoom={handlerRoom}
              />
            ))
          ) : (
            <div>Пусто</div>
          )}
        </div>
      </div>
    </div>
  )
}
