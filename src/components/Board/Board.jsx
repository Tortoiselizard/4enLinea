import './Board.css'

import Box from '../Box/Box'
import { placeTab, players } from '../../constants'

function Board ({ board, changeBoard, turn, changeTurn, changeLastPlay }) {
  function handleBoard (column) {
    const [newBorn, lastPlay] = placeTab(board, column, turn.color)
    changeBoard(newBorn)
    changeLastPlay(lastPlay)
    handleTurn()
  }

  function handleTurn () {
    changeTurn(turn => turn.color === 'red' ? players.player2 : players.player1)
  }

  return (
    <section className='board-container'>
      {
        board.map((column, indexColumn) => {
          return column.map((box, index) => <Box color={box} changeBoard={handleBoard} column={indexColumn} index={index} key={index} />)
        })
      }
    </section>
  )
}

export default Board
