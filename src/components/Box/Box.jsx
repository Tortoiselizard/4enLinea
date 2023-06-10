import './Box.css'

function Box ({ color, changeBoard, column }) {
  return (
    <div>
      <button onClick={() => changeBoard(column)} className='box-container' id={color === 'red' ? 'box-container-p1' : color === 'yellow' ? 'box-container-p2' : 'null'} />
    </div>
  )
}

export default Box
