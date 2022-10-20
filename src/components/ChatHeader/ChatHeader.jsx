import './ChatHeader.css'
import backImg from './back.svg'

export const ChatHeader = ({ currentRoom, chatSelected, setChatSelected }) => {
  return (
    <div className="chat__header">
      {chatSelected && (
        <button className="back__btn" onClick={() => setChatSelected(false)}>
          <img src={backImg} alt="" />
        </button>
      )}
      <img src={currentRoom.roomAvatar} className="chat__header__img" alt="" />
      <div className="chat__header__name">{currentRoom.roomId}</div>
    </div>
  )
}
