import { useState, useEffect } from 'react'

import Header from './components/Header/Header'
import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import Message from './components/Message/Message'
import { board, players, gameOver, makeLines, updateLines } from './constants'

import './App.css'

function App () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  const [lastPlay, setLastPlay] = useState(null)

  const [record, setRecord] = useState(() => makeLines(boardState))

  const [gameStatus, setGameStatus] = useState({
    status: 'playing'
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
        setGameStatus({
          state: 'win',
          player: playerWin,
          comment: 'Congratulations on your victory'
        })
      }
    }
  }, [record])

  function handleRecord () {
    const newRecord = updateLines(lastPlay, record)
    setRecord(newRecord)
  }

  function restartGame () {
    setBoardState(Array(6).fill(null).map(() => Array(7).fill('n')))
    setTurn(players.player1)
    setLastPlay(null)
    setRecord(() => makeLines(Array(6).fill(null).map(() => Array(7).fill('n'))))
    setGameStatus({
      status: 'playing'
    })
  }

  return (
    <>
      <Header />
      <Board board={boardState} changeBoard={setBoardState} turn={turn} changeTurn={setTurn} changeLastPlay={setLastPlay} />
      <Footer turn={turn} />
      <Message gameCondition={gameStatus} utility={restartGame} />
    </>
  )
}

export default App
