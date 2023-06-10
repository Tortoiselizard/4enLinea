import { useState } from 'react'
import './Board.css'

import Box from '../Box/Box'
import { board, players, placeTab } from '../../constants'

function Board () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  function handleBoard (column) {
    setBoardState(placeTab(boardState, column, turn.color))
    handleTurn()
  }

  function handleTurn () {
    setTurn(turn => turn.color === 'red' ? players.player2 : players.player1)
  }

  return (
    <section className='board-container'>
      {
        boardState.map((column, indexColumn) => {
          return column.map((box, index) => <Box color={box} changeBoard={handleBoard} column={indexColumn} index={index} key={index} />)
        })
      }
    </section>
  )
}

export default Board
