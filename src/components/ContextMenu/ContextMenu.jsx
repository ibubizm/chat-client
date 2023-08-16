import './contextMenu.css'

export const ContextMenu = ({ data }) => {
  return (
    <div className="menu__container">
      {data.map((item) => (
        <div
          key={item.id}
          onContextMenu={(e) => {
            e.preventDefault()
            console.log('Right Click', e.pageX, e.pageY)
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
