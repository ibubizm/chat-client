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
  const [hasInSub, setHasInSub] = useState(false)
  // const [admin, setAdmin] = useState(false)
  const dispatch = useDispatch()

  const subscribeToggle = () => {
    dispatch(subscribe(user._id, currentRoom._id)).then(() => {
      getSubs()
      // check()
    })
  }

  const unSubscribeToggle = () => {
    dispatch(unsubscribe(user._id, currentRoom._id)).then(() => {
      getSubs()
      // check()
    })
  }

  const toggleModal = () => {
    setModal((modal) => !modal)
    getSubs()
    check()
  }

  const check = () => {
    console.log(sub, 'sub')
    console.log(subscribers, 'subscribers')
    if (subscribers?.includes(user._id)) {
      setHasInSub(true)
    } else setHasInSub(false)
  }

  const getSubs = () => {
    if (currentRoom) {
      getSubscribers(currentRoom._id).then((data) => {
        setSub(data.subscribers)
      })
    }
  }

  useEffect(() => {
    console.log('use effect')
    check()
  }, [subscribers])

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
                      <span>{currentRoom.admin === i._id ? 'admin' : ''}</span>
                    </div>
                  ))}
              </div>
              {!hasInSub ? (
                <div className="btn  access" onClick={subscribeToggle}>
                  subscribe
                </div>
              ) : (
                <div className="btn  cancel" onClick={unSubscribeToggle}>
                  unsubscribe
                </div>
              )}
            </Modal>
          )}
        </>
      )}
    </div>
  )
}
