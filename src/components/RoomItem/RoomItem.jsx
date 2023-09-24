import { memo } from 'react'
import { timeFunc } from '../../helpers/halpers'
import './RoomItem.css'
import { useSelector } from 'react-redux'

export const RoomItem = memo(({ room, handlerRoom }) => {
  const { currentRoom } = useSelector(({ roomReducer }) => roomReducer)

  return (
    <div
      onClick={() => handlerRoom(room)}
      className={
        currentRoom._id === room._id
          ? 'room__item room__item-active'
          : 'room__item'
      }
    >
      <img className="room__item__icon" src={room.roomAvatar} alt="" />
      <div className="room__item__detail">
        <div className="room__item__name">{room.roomId}</div>
        <div className="room__item__message">
          {room.lastMessage ? room.lastMessage : 'Пусто'}
        </div>
      </div>
      <div className="room__item__time">{timeFunc(room.updatedAt)}</div>
    </div>
  )
})
