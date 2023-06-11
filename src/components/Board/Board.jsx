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
    changeTurn(turn => turn.color === 'r' ? players.player2 : players.player1)
  }

  return (
    <section className='board-container'>
      {
        board.map((row, indexRow) => {
          return (
            <div key={`row${indexRow}`}>
              {
                row.map((box, indexColumn) => <Box color={box} changeBoard={handleBoard} column={indexColumn} key={`box-row${indexRow}-column${indexColumn}`} />)
              }
            </div>
          )
        })
      }
    </section>
  )
}

export default Board
