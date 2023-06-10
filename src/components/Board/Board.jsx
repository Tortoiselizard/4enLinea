import { useState } from 'react'
import './Board.css'

import Box from '../Box/Box'
import { board, players } from '../../constants'

function Board () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  function handleBoard (index) {
    if (boardState[index] === null) {
      setBoardState(boardState => {
        const newBoard = [...boardState]
        newBoard[index] = turn.color
        return newBoard
      })
      handleTurn()
    }
  }

  function handleTurn () {
    setTurn(turn => turn.color === 'red' ? players.player2 : players.player1)
  }

  return (
    <section className='board-container'>
      {
        boardState.map((box, index) => <Box color={box} changeBoard={handleBoard} index={index} key={index} />)
      }
    </section>
  )
}

export default Board
