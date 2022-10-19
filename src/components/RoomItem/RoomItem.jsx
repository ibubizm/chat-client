import './RoomItem.css'

export const RoomItem = ({ roomId, active, handlerRoom }) => {
  return (
    <div
      onClick={() => handlerRoom(roomId)}
      className={active ? 'room__item active' : 'room__item '}
    >
      <img
        className="room__item__icon"
        src={'https://avatars.githubusercontent.com/u/66380357?v=4'}
        alt=""
      />
      <div className="room__item__detail">
        <div className="room__item__name">{roomId}</div>
        <div className="room__item__message">Когда сможешь взять задачу?</div>
      </div>
      <div className="room__item__time">12:21</div>
    </div>
  )
}
