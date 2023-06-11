export const board = Array(7).fill(null).map(() => Array(6).fill(null))
export const players = {
  player1: {
    name: 'Troy Pernía',
    color: 'red'
  },
  player2: {
    name: 'Marina Sanchez',
    color: 'yellow'
  }
}

export function placeTab (board, column, color) {
  const newBoard = [...board]
  let lastPlay = {}
  for (const index in newBoard[column]) {
    if (newBoard[column][index] === null) {
      newBoard[column][index] = color
      lastPlay = {
        x: column,
        y: Number(index),
        color
      }
      break
    }
  }
  return [newBoard, lastPlay]
}

export function gameOver (board, lastPlay, record) {
  // Si la lista de puntos tienen más de 1 punto, evaluo si hay puntos alrededor de la última jugada
  if (record[color].points.length > 1) {
    // Si la lista de rectas esta vacia entonces agrego las nuevas rectas en función de los puntos adyacentes a la última jugada
    if (!record[color].lines.length && listDotsAround.length) {
      listDotsAround.forEach(point => {
        record[color].lines.push(equationLine({ x1: x, y1: y }, { x2: point[0], y2: point[1] }))
      })
      console.log(record[color].lines[1](x))
    }
  }

  // return { status: 'win', name: 'Troy Pernía' }
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
