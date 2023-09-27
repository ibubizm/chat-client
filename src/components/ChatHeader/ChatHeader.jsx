import { useEffect, useState } from 'react'
import { subscribe, unsubscribe } from '../../http'
import './ChatHeader.css'
import { IoIosArrowBack } from 'react-icons/io'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'

export const ChatHeader = ({ currentRoom, chatSelected, setChatSelected }) => {
  const user = useSelector(({ userReducer }) => userReducer.user)
  const [sub, setSub] = useState(false)
  const dispatch = useDispatch()

  const subscribeToggle = () => {
    dispatch(subscribe(user._id, currentRoom._id))
  }

  const unSubscribeToggle = () => {
    dispatch(unsubscribe(user._id, currentRoom._id))
  }

  useEffect(() => {
    console.log(currentRoom.subscribers)
    if (currentRoom.subscribers?.includes(user._id)) {
      setSub(true)
    } else {
      setSub(false)
    }
  }, [currentRoom, user._id, sub])

  return (
    <div className="chat__header">
      {chatSelected && (
        <button className="back__btn" onClick={() => setChatSelected(false)}>
          <IoIosArrowBack />
          <span>back</span>
        </button>
      )}
      {!currentRoom.roomId ? (
        'select a chat'
      ) : (
        <>
          <img
            src={currentRoom.roomAvatar}
            className="chat__header__img"
            alt=""
          />
          <div className="chat__header__name">{currentRoom.roomId}</div>
          <BsThreeDots className="chat__header__menu" />
          {/* {!sub ? (
            <div onClick={subscribeToggle}>sub</div>
          ) : (
            <div onClick={unSubscribeToggle}>unsub</div>
          )} */}
        </>
      )}
    </div>
  )
}
