import { useState } from 'react'

import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import { board, players } from './constants'

import './App.css'

function App () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  return (
    <>
      <header>Encabezado</header>
      <Board board={boardState} changeBoard={setBoardState} turn={turn} changeTurn={setTurn} />
      <Footer turn={turn} />
    </>
  )
}

export default App
