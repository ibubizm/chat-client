import './settingMenu.css'
import { Input } from '../input/input'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { DarkMode } from '../DarkMode/DarkMode'
import { Button } from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../http'
import { getImage } from '../../helpers/imageHalper'

export const SettingsMenu = ({ createRoom, onClose }) => {
  const currentUser = useSelector(({ toolkit }) => toolkit.user)
  const [newUserName, setNewUserName] = useState(currentUser.userName)
  const [toggleEdit, setToggleEdit] = useState(false)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [newRoom, setNewRoom] = useState({
    roomId: '',
    roomAvatar: '',
    admin: '',
  })

  const dispatch = useDispatch()

  const cancel = () => {
    setToggleEdit(false)
    setNewUserName(currentUser.userName)
  }

  const onSubmit = () => {
    const user = new FormData()
    user.append('userId', currentUser._id)
    user.append('userName', newUserName)
    user.append('avatar', avatar)
    dispatch(updateUser(user))
    onClose()
  }

  const createChat = () => {
    createRoom(newRoom)
  }

  return (
    <div className="setting">
      <div className="setting__field">
        {currentUser.avatar && (
          <img
            className="avatar"
            src={getImage(currentUser.avatar)}
            alt="ava"
          />
        )}
        <input
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
          accept="image/*, .png, .jpg"
        />
      </div>
      <div className="setting__field">
        dark theme
        <DarkMode />
      </div>
      <div className="setting__field createroom">
        create room
        <Input
          placeholder={'room name'}
          value={newRoom.roomId}
          onChange={(e) =>
            setNewRoom({
              ...newRoom,
              roomId: e.target.value,
              admin: currentUser._id,
            })
          }
        />
        <Input
          placeholder={'avatar url'}
          value={newRoom.avatar}
          onChange={(e) =>
            setNewRoom({ ...newRoom, roomAvatar: e.target.value })
          }
        />
        <Button className={'sm'} onClick={createChat}>
          create room
        </Button>
      </div>

      <div className="setting__field">
        <span>{newUserName}</span>
        <FaEdit onClick={() => setToggleEdit(true)} />
      </div>
      {toggleEdit && (
        <div className="setting__input">
          <Input
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="name"
          />
          <div className="setting__input__btns">
            <Button color={'cancel'} className={'sm'} onClick={cancel}>
              cancel
            </Button>
            <Button className={'sm'} onClick={() => setToggleEdit(false)}>
              edit
            </Button>
          </div>
        </div>
      )}
      <Button onClick={onSubmit}>save</Button>
    </div>
  )
}
