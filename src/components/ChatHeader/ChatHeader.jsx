import { useEffect, useState } from 'react'
import { getSubscribers, subscribe, unsubscribe } from '../../http'
import './ChatHeader.css'
import { IoIosArrowBack } from 'react-icons/io'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { BsThreeDots } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../modal/modal'
import { getImage } from '../../helpers/imageHalper'

export const ChatHeader = ({ currentRoom, chatSelected, setChatSelected }) => {
  const user = useSelector(({ userReducer }) => userReducer.user)
  const { subscribers } = useSelector(
    ({ roomReducer }) => roomReducer.currentRoom
  )

  const [sub, setSub] = useState([])
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()

  const subscribeToggle = () => {
    dispatch(subscribe(user._id, currentRoom._id)).then(
      console.log(subscribers)
    )
    console.log(subscribers)
  }

  const unSubscribeToggle = () => {
    console.log(subscribers)
    dispatch(unsubscribe(user._id, currentRoom._id))
  }

  const toggleModal = () => {
    setModal((modal) => !modal)
  }

  // const check = () => {
  //   if (user?.includes(user._id)) {
  //     return true
  //   } else return false
  // }

  useEffect(() => {
    console.log(subscribers, '------s')
    if (currentRoom) {
      getSubscribers(currentRoom._id).then(({ subscribers }) => {
        setSub(subscribers)
      })
    }
  }, [currentRoom])

  // useEffect(() => {
  //   if (currentRoom) {
  //     console.log(sub)
  //     setSub(currentRoom.subscribers)
  //     check()
  //   }
  // }, [user._id, sub, currentRoom])

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
          <BsThreeDots className="chat__header__menu" onClick={toggleModal} />
          {modal && (
            <Modal title={currentRoom.roomId} onClose={toggleModal}>
              <div onClick={subscribeToggle}>sub</div>
              <div onClick={unSubscribeToggle}>unsub</div>
              <div className="subscriber__list">
                {sub &&
                  sub.map((i) => (
                    <div className="subscriber__list__item" key={i._id}>
                      {i.avatar !== '' ? (
                        <img
                          alt="avatar"
                          className="subscriber__list__icon"
                          src={getImage(i.avatar)}
                        />
                      ) : (
                        <HiOutlineUserCircle className="subscriber__list__icon" />
                      )}

                      <span>{i.userName}</span>
                    </div>
                  ))}
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  )
}
