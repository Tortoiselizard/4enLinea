import './Box.css'

function Box ({ color }) {
  return (
    <div className={color === 'red' ? 'box-container-p1' : color === 'yellow' ? 'box-container-p2' : 'box-container'} />
  )
}

export default Box
