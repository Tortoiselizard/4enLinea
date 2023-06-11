import './Box.css'

function Box ({ color, changeBoard, column }) {
  return (
    <div>
      <button onClick={() => changeBoard(column)} className='box-container' id={color === 'r' ? 'box-container-p1' : color === 'y' ? 'box-container-p2' : 'null'} />
    </div>
  )
}

export default Box
