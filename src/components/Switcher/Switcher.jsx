import './switcher.css'

export const Switcher = ({ onChenge, selectedTheme }) => {
  return (
    <>
      <label htmlFor="darkmode-toggle" class="switch">
        <input
          id="darkmode-toggle"
          type="checkbox"
          onChange={(e) => onChenge(e)}
          defaultChecked={selectedTheme === 'dark'}
        />
        <span class="slider round"></span>
      </label>
    </>
  )
}
