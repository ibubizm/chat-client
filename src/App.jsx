import React, { useEffect } from 'react'
import './App.css'

import ChatPage from './pages/ChatPage'
import { useDispatch } from 'react-redux'
import { registration, auth } from './http'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!localStorage.getItem('selectedTheme')) {
      document.querySelector('body').setAttribute('data-theme', 'light')
    } else {
      const theme = localStorage.getItem('selectedTheme')
      document.querySelector('body').setAttribute('data-theme', theme)
    }
    if (!localStorage.getItem('userId')) {
      dispatch(registration())
      localStorage.setItem('roomId', 'mainRoom')
    } else {
      dispatch(auth(localStorage.getItem('userId')))
    }
  }, [])
  return <ChatPage />
}

export default App
