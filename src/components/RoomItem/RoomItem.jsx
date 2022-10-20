import './RoomItem.css'

export const RoomItem = ({ room, handlerRoom }) => {
  return (
    <div
      onClick={() => handlerRoom(room)}
      className={
        localStorage.getItem('roomId') == room.roomId
          ? 'room__item room__item-active'
          : 'room__item'
      }
    >
      <img className="room__item__icon" src={room.roomAvatar} alt="" />
      <div className="room__item__detail">
        <div className="room__item__name">{room.roomId}</div>
        <div className="room__item__message">
          {room.text ? room.text : 'Когда сможешь взять задачу?'}
        </div>
      </div>
      <div className="room__item__time">
        {new Date(room.date).toLocaleTimeString()}
      </div>
    </div>
  )
}
