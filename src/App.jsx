import { useState, useEffect } from 'react'

import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import { board, players, gameOver, findDotsAround, equationLine, isLineNew, makeLines, updateLines } from './constants'

import './App.css'

function App () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  const [lastPlay, setLastPlay] = useState(null)

  const [record, setRecord] = useState(() => makeLines(boardState))

  const [gameStatus, setGameStatus] = useState({
    status: 'continue'
  })

  useEffect(() => {
    if (lastPlay !== null) handleRecord()
  }, [lastPlay])

  useEffect(() => {
    if (lastPlay !== null) {
      const newGameStatus = gameOver(record, lastPlay)
      if (newGameStatus.state === 'win') {
        let playerWin
        for (const player in players) {
          if (players[player].color === newGameStatus.color) {
            playerWin = players[player]
            break
          }
        }
        console.log(`Has ganado ${playerWin.name}`)
        setGameStatus(newGameStatus)
      }
    }
  }, [record])

  function handleRecord () {
    const newRecord = updateLines(lastPlay, record)
    setRecord(newRecord)
  }

  return (
    <>
      <header>Encabezado</header>
      <Board board={boardState} changeBoard={setBoardState} turn={turn} changeTurn={setTurn} changeLastPlay={setLastPlay} />
      <Footer turn={turn} />
      <button onClick={() => console.log(record)}> Ver Record </button>
    </>
  )
}

export default App
