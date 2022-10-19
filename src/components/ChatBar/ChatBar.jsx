import { Input } from '../input/input'
import { RoomItem } from '../RoomItem/RoomItem'
import mainLogo from './logo.png'
import './ChatBar.css'

export const ChatBar = ({ handlerRoom }) => {
  return (
    <div className="chat__sidebar">
      <img className="logo" src={mainLogo} alt="" />
      <div>
        <Input icon={true} placeholder={'Поиск'} />
        <div className="chat__rooms">
          <RoomItem roomId={'mainRoom'} handlerRoom={handlerRoom} />
          {/* <RoomItem roomId={'room 2'} handlerRoom={handlerRoom} /> */}
        </div>
      </div>
    </div>
  )
}
