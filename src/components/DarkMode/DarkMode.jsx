import { Switcher } from '../Switcher/Switcher'

export const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'dark')
    localStorage.setItem('selectedTheme', 'dark')
  }
  const setLightMode = () => {
    document.querySelector('body').setAttribute('data-theme', 'light')
    localStorage.setItem('selectedTheme', 'light')
  }

  const selectedTheam = localStorage.getItem('selectedTheme')

  if (selectedTheam === 'dark') {
    setDarkMode()
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setDarkMode()
    } else setLightMode()
  }
  return (
    <div className="dark__mode">
      <Switcher onChenge={toggleTheme} selectedTheme={selectedTheam} />
    </div>
  )
}
