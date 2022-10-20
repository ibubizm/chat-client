import { Input } from '../input/input'
import { RoomItem } from '../RoomItem/RoomItem'
import mainLogo from './logo.png'
import './ChatBar.css'

export const ChatBar = ({ rooms, handlerRoom }) => {
  return (
    <div className="chat__sidebar">
      <div>
        <div className="label">
          <img className="logo" src={mainLogo} alt="" />
          <Input icon={true} placeholder={'Поиск'} />
        </div>
        <div className="chat__rooms">
          {rooms &&
            rooms.map((room) => (
              <RoomItem
                key={room.roomId}
                room={room}
                handlerRoom={handlerRoom}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
