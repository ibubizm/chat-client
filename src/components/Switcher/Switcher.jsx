import './switcher.css'

export const Switcher = ({ onChenge, selectedTheme }) => {
  return (
    <>
      <label htmlFor="darkmode-toggle" className="switch">
        <input
          id="darkmode-toggle"
          type="checkbox"
          onChange={(e) => onChenge(e)}
          defaultChecked={selectedTheme === 'dark'}
        />
        <span className="slider round"></span>
      </label>
    </>
  )
}
