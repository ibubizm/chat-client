import React, { useEffect } from 'react'
import './App.css'
import { images } from './images'
import ChatPage from './pages/ChatPage'
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator'

function App() {
  useEffect(() => {
    if (!localStorage.getItem('selectedTheme')) {
      document.querySelector('body').setAttribute('data-theme', 'light')
    } else {
      const theme = localStorage.getItem('selectedTheme')
      document.querySelector('body').setAttribute('data-theme', theme)
    }
    if (!localStorage.getItem('userName')) {
      const randomName = uniqueNamesGenerator({
        dictionaries: [colors, animals],
      })
      localStorage.setItem('userName', randomName)
      localStorage.setItem('userId', Math.random())
      localStorage.setItem(
        'avatar',
        images[Math.floor(Math.random() * images.length)]
      )
      // localStorage.setItem('roomId', 'mainRoom')
    }
  }, [])
  return <ChatPage />
}

export default App
