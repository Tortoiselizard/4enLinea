import './Board.css'

import Box from '../Box/Box'
import { board } from '../../constants'

function Board () {
  return (
    <section className='board-container'>
      {
        board.map((box, index) => <Box color={null} key={index} />)
      }
    </section>
  )
}

export default Board
