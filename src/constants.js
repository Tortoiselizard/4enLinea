export const board = Array(7).fill(null).map(() => Array(7).fill(null))
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
  for (const index in newBoard[column]) {
    if (newBoard[column][index] === null) {
      console.log(`entre al if en la iteración ${index}`)
      newBoard[column][index] = color
      break
    }
  }
  return newBoard
}

export function winner () {

}
