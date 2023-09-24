import { Input } from '../input/input'
import { Modal } from '../modal/modal'
import { RoomItem } from '../RoomItem/RoomItem'
import './ChatBar.css'
import { useEffect, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { SettingsMenu } from '../SettingsMenu/SettingsMenu'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { SERVER_URI } from '../../constatnts'

export const ChatBar = ({ rooms, handlerRoom, createUser, createRoom }) => {
  const { user } = useSelector(({ userReducer }) => userReducer)
  const { rooms: usersRooms } = useSelector(({ roomReducer }) => roomReducer)
  const [input, setInput] = useState('')
  const [modal, setModal] = useState(false)
  const [searchList, setSearchList] = useState([])

  const openModal = () => {
    setModal(true)
  }

  const onClose = () => {
    setModal(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(SERVER_URI + '/rooms/findRooms', { params: { roomId: input } })
        .then(({ data }) => setSearchList(data.rooms))
    }, 1000)

    return () => clearTimeout(timer)
  }, [input])

  // const filtredRooms = rooms.filter(async (room) => {
  //   room.roomId.toLowerCase().includes(input.toLowerCase())
  // })
  // filtredRooms.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

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
        {input.length !== 0 && (
          <div>
            {searchList.length !== 0 && (
              <>
                <span className="chat__rooms__title">search result</span>
                {searchList.map((room) => (
                  <RoomItem
                    key={room.roomId}
                    room={room}
                    handlerRoom={handlerRoom}
                  />
                ))}
              </>
            )}
          </div>
        )}
        {user.subscriptions ? (
          <>
            {input.length !== 0 && (
              <span className="chat__rooms__title">my rooms</span>
            )}

            {usersRooms &&
              usersRooms.map((room) => (
                <RoomItem
                  key={room.roomId}
                  room={room}
                  handlerRoom={handlerRoom}
                />
              ))}
          </>
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
