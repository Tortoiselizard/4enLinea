export const board = Array(6).fill(null).map(() => Array(7).fill('n'))
export const players = {
  player1: {
    name: 'Troy Pernía',
    color: 'r'
  },
  player2: {
    name: 'Marina Sanchez',
    color: 'y'
  }
}

export const winCondition = {
  r: 'rrrr',
  y: 'yyyy'
}

export function placeTab (board, column, color) {
  const newBoard = [...board]
  let lastPlay = {}
  for (const row in newBoard) {
    if (newBoard[row][column] === 'n') {
      newBoard[row][column] = color
      lastPlay = {
        x: column,
        y: Number(row),
        color
      }
      break
    }
  }
  return [newBoard, lastPlay]
}

export function gameOver (record, lastPlay) {
  const { x, y, color } = lastPlay
  const conditionGame = {
    state: 'continue'
  }
  // Verificar las lineas horizontales
  if (record.horizontalLine[y].includes(winCondition[color])) {
    conditionGame.state = 'win'
    conditionGame.color = lastPlay.color
  }
  // Verificar las lineas verticales
  if (record.verticalLine[x].includes(winCondition[color])) {
    conditionGame.state = 'win'
    conditionGame.color = lastPlay.color
  }
  // Verificar las lineas crecientes
  if (record.crescentLine[x + 5 - y].includes(winCondition[color])) {
    conditionGame.state = 'win'
    conditionGame.color = lastPlay.color
  }
  // Verificar las lineas decrecientes
  if (record.decreasingLine[x + y].includes(winCondition[color])) {
    conditionGame.state = 'win'
    conditionGame.color = lastPlay.color
  }
  return conditionGame
}

export function findDotsAround (point, pointList) {
  const { x, y } = point
  const listDotsAround = []
  pointList.forEach(point => {
    if (point.x >= x - 1 && point.x <= x + 1 && point.y >= y - 1 && point.y <= y + 1) {
      listDotsAround.push({ x: point.x, y: point.y })
    }
  })
  return listDotsAround
}

export function equationLine (point1, point2) {
  const { x1, y1 } = point1
  const { x2, y2 } = point2
  if (x2 - x1) {
    const m = (y2 - y1) / (x2 - x1)
    const b = y2 - m * x2
    return { clearVar: 'y', equation: function (x) { return m * x + b } }
  } else {
    return { clearVar: 'x', equation: function (y) { return x1 } }
  }
}

export function isLineNew (equation, listEquations) {
  let newEquation = true
  for (let i = 0; i < listEquations.length; i++) {
    if (listEquations[i](0) === equation(0) && listEquations[i](1) === equation(1)) {
      newEquation = false
      break
    }
  }
  return newEquation
}

export function makeLines (board) {
  const horizontalLine = makeHorizontalLine(board)
  const verticalLine = makeVerticalLine(board)
  const crescentLine = makeCrescentLine(board)
  const decreasingLine = makeDecreasingLine(board)
  return {
    horizontalLine,
    verticalLine,
    crescentLine,
    decreasingLine
  }
}

export function updateLines (lastPlay, record) {
  const { x, y } = lastPlay
  const newRecord = { ...record }
  newRecord.horizontalLine[y] = updateHorizontalLine(lastPlay, newRecord.horizontalLine[y])
  newRecord.verticalLine[x] = updateVerticalLine(lastPlay, newRecord.verticalLine[x])
  newRecord.crescentLine[x + 5 - y] = updateCrescentLine(lastPlay, newRecord.crescentLine[x + 5 - y])
  newRecord.decreasingLine[x + y] = updateDecreasingLine(lastPlay, newRecord.decreasingLine[x + y])
  return newRecord
}

export function makeHorizontalLine (board) {
  return board.map(row => row.join(''))
}

export function updateHorizontalLine ({ x, y, color }, recordLine) {
  const newRecordLine = recordLine.split('')
  newRecordLine[x] = color
  return newRecordLine.join('')
}

export function makeVerticalLine (board) {
  const verticalLine = []
  for (const column in board[0]) {
    let vertical = ''
    for (const row in board) {
      vertical = vertical + (board[row][column])
    }
    verticalLine.push(vertical)
  }
  return verticalLine
}

export function updateVerticalLine ({ x, y, color }, recordLine) {
  const newRecordLine = recordLine.split('')
  newRecordLine[y] = color
  return newRecordLine.join('')
}

export function makeCrescentLine (board) {
  let x = 0
  let y = 5
  const crescent = []

  while (x < board[0].length) {
    let stringLine = ''
    let i = x
    let j = y
    while (pointExist({ x: i, y: j }, board)) {
      stringLine = stringLine + board[j][i]
      i++
      j++
    }
    crescent.push(stringLine)
    if (y > 0) { y-- } else { x++ }
  }

  return crescent
}

export function updateCrescentLine ({ x, y, color }, recordLine) {
  const newRecordLine = recordLine.split('')
  const position = (x + 5 - y) <= 5 ? x : y
  newRecordLine[position] = color
  return newRecordLine.join('')
}

export function makeDecreasingLine (board) {
  let x = 0
  let y = 0
  const decreasing = []

  while (x < board[0].length) {
    let stringLine = ''
    let i = x
    let j = y
    while (pointExist({ x: i, y: j }, board)) {
      stringLine = stringLine + board[j][i]
      i++
      j--
    }
    decreasing.push(stringLine)
    if (y < 5) { y++ } else { x++ }
  }

  return decreasing
}

export function updateDecreasingLine ({ x, y, color }, recordLine) {
  const newRecordLine = recordLine.split('')
  const position = (x + y) <= 5 ? x : 5 - y
  newRecordLine[position] = color
  return newRecordLine.join('')
}

export function pointExist (point, board) {
  const { x, y } = point
  if (x >= 0 && x < board[0].length && y < board.length && y >= 0) return true
  return false
}
