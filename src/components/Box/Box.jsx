import './Box.css'

function Box ({ color, changeBoard, index }) {
  return (
    <div>
      <button className={color === 'red' ? 'box-container-p1' : color === 'yellow' ? 'box-container-p2' : 'box-container'} onClick={() => { changeBoard(index) }} />
    </div>
  )
}

export default Box
