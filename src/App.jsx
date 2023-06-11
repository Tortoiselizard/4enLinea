import { useState, useEffect } from 'react'

import Board from './components/Board/Board'
import Footer from './components/Footer/Footer'
import { board, players, gameOver, findDotsAround, equationLine, isLineNew } from './constants'

import './App.css'

function App () {
  const [boardState, setBoardState] = useState(board)

  const [turn, setTurn] = useState(players.player1)

  const [lastPlay, setLastPlay] = useState(null)

  const [record, setRecord] = useState({
    red: {
      points: [],
      lines: []
    },
    yellow: {
      points: [],
      lines: []
    }
  })

  useEffect(() => {
    if (lastPlay !== null) handleRecord()
  }, [lastPlay])

  function handleRecord () {
    const { x, y, color } = lastPlay
    const newRecord = { ...record }
    const listEquationsX = []
    newRecord[color].lines.forEach(straight => {
      if (straight.line.clearVar === 'x') {
        listEquationsX.push(straight.line.equation)
      }
    })
    const listEquationsY = []
    newRecord[color].lines.forEach(straight => {
      if (straight.line.clearVar === 'y') {
        listEquationsY.push(straight.line.equation)
      }
    })

    // Verifico que fichas están alrededor de la última jugada
    const dotsAround = findDotsAround(lastPlay, newRecord[color].points)

    // En caso de haber fichas alrededor, creo una nueva recta o añado la neva ficha a la lista de puntos de una recta ya creada
    dotsAround.forEach(point => {
      const point1 = { x1: x, y1: y }
      const point2 = { x2: point.x, y2: point.y }
      const line = equationLine(point1, point2)

      // En caso de que la recta sea nueva, añado los puntos correspondientes
      if (isLineNew(line.equation, line.clearVar === 'y' ? listEquationsY : listEquationsX)) {
        const points = [{ x: point.x, y: point.y }, { x, y }]
        newRecord[color].lines.push({ line, points })
        console.log('ecuaciones:', newRecord[color].lines)
      }
    })

    newRecord[color].points.push(lastPlay)

    if (record[color].lines.length) { setRecord(newRecord) }
  }

  return (
    <>
      <header>Encabezado</header>
      <Board board={boardState} changeBoard={setBoardState} turn={turn} changeTurn={setTurn} changeLastPlay={setLastPlay} />
      <Footer turn={turn} />
    </>
  )
}

export default App
