import './settingMenu.css'
import { Input } from '../input/input'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { DarkMode } from '../DarkMode/DarkMode'
import { Button } from '../button/Button'

export const SettingsMenu = ({ createUser }) => {
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [toggleEdit, setToggleEdit] = useState(false)
  const [avatar, setAvatar] = useState('')

  const cancel = () => {
    setToggleEdit(false)
    setUserName(localStorage.getItem('userName'))
  }

  const onSubmit = () => {
    // const formData = new FormData()
    // formData.append('userName', userName)
    // formData.append('avatar', avatar)
    const user = { avatar, userName }

    createUser(user)
  }
  return (
    <div className="setting">
      <div className="setting__field">
        {avatar ? (
          <img className="avatar" src={URL.createObjectURL(avatar)} alt="" />
        ) : (
          <img className="avatar" src={localStorage.getItem('avatar')} alt="" />
        )}
        <input
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
          // accept="image/*, .png, .jpg"
        />
      </div>
      <div className="setting__field">
        dark theme
        <DarkMode />
      </div>

      <div className="setting__field">
        <span>{userName}</span>
        <FaEdit onClick={() => setToggleEdit(true)} />
      </div>
      {toggleEdit && (
        <div className="setting__input">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="name"
          />
          <Button className={'sm'} onClick={cancel}>
            cancel
          </Button>
          <Button className={'sm'} onClick={() => setToggleEdit(false)}>
            edit
          </Button>
        </div>
      )}
      <Button onClick={onSubmit}>save</Button>
    </div>
  )
}
