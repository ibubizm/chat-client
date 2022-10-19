import './ChatHeader.css'
import backImg from './back.svg'

export const ChatHeader = ({ chatSelected, setChatSelected }) => {
  return (
    <div className="chat__header">
      {chatSelected && (
        <button className="back__btn" onClick={() => setChatSelected(false)}>
          <img src={backImg} alt="" />
        </button>
      )}
      <img
        src={'https://avatars.githubusercontent.com/u/66380357?v=4'}
        className="chat__header__img"
        alt=""
      />
      <div className="chat__header__name">{localStorage.getItem('roomId')}</div>
    </div>
  )
}
