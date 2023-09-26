import { useState, useRef, useEffect } from 'react'
import sendIcon from './send.svg'
import './ChatFooter.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersRooms, updateUsersRooms } from '../../http'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'

export const ChatFooter = ({
  sendMessage,
  roomUpdate,
  scrollFunc,
  reply,
  closeReply,
  inputValue,
  setInputValue,
  toggleEdit,
  onEdit,
}) => {
  const user = useSelector(({ userReducer }) => userReducer.user)
  const room = useSelector(({ roomReducer }) => roomReducer.currentRoom)

  const ref = useRef(null)

  const dispatch = useDispatch()

  const onKey = (e) => {
    ref.current.focus()
    let scHeight = ref.current.scrollHeight

    if (e.shiftKey && e.key === 'Enter') {
      ref.current.style.height = `${scHeight + 18}px`
    }
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault()
      // handleSendMessage()
      submitFunc()
    }

    if (e.key === 'Backspace') {
      ref.current.style.height = `${scHeight - 18}px`
    }
  }

  const handleSendMessage = () => {
    if (inputValue !== '') {
      const mes = {
        author: user._id,
        roomId: room._id,
        messageId: Math.random(),
        userId: user._id,
        text: inputValue,
        replyId: reply._id,
      }
      scrollFunc()
      sendMessage(mes)
      dispatch(updateUsersRooms(room._id, inputValue))
      closeReply()
    } else {
      alert('empty')
    }
    setInputValue('')
  }

  const submitFunc = () => {
    if (toggleEdit.text) {
      onEdit(toggleEdit)
    } else {
      handleSendMessage()
    }
  }
  return (
    <div className="chat__footer">
      {reply.text && (
        <div className="reply">
          <span className="reply__text">{reply.text}</span>
          <AiOutlineCloseCircle onClick={closeReply} />
        </div>
      )}
      {toggleEdit.text && (
        <div className="reply">
          <span className="reply__text">{toggleEdit.text}</span>
          <AiOutlineCloseCircle onClick={closeReply} />
        </div>
      )}
      <form className="form" onSubmit={submitFunc}>
        <textarea
          onChange={(e) => {
            setInputValue(e.target.value)
            ref.current.focus()
          }}
          className="textarea"
          ref={ref}
          type="text"
          placeholder="Введите сообщение"
          value={inputValue}
          onKeyDown={onKey}
        />

        {!toggleEdit.text ? (
          <button className="button__send">
            <img className="send__icon" src={sendIcon} alt="" />
          </button>
        ) : (
          <button className="button__send">
            <GrEdit className="send__icon" />
          </button>
        )}
      </form>
    </div>
  )
}
