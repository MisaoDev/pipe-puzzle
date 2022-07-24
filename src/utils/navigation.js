import { UP, RIGHT, DOWN, LEFT, shiftDirection } from '@/utils/directions'
import cellTypes from '@/utils/cellTypes' // eslint-disable-line

const deltas = []

// prettier-ignore
{
  deltas[UP]    = { y: -1, x: 0  }
  deltas[RIGHT] = { y:  0, x: 1  }
  deltas[DOWN]  = { y:  1, x: 0  }
  deltas[LEFT]  = { y:  0, x: -1 }
}

const wrap = (val, size) => (val < 0 ? size - 1 : val % size)

const contain = (val, size) => (val < 0 ? 0 : val >= size ? size - 1 : val)

export const getNeighbour = (
  row,
  col,
  direction,
  width,
  height,
  wrapBoard = false,
) => {
  const delta = deltas[direction]
  let [nRow, nCol] = [row + delta.y, col + delta.x]

  nRow = wrapBoard ? wrap(nRow, height) : contain(nRow, height)
  nCol = wrapBoard ? wrap(nCol, width) : contain(nCol, width)
  const isSameCell = row === nRow && col === nCol
  return isSameCell ? null : { row: nRow, col: nCol }
}

export const getNeighbours = (row, col, board, wrapMode = false) => {
  const { type, rotation } = board[row][col]
  const cellType = cellTypes[type]
  const paths = cellType.paths.map((dir) => shiftDirection(dir, rotation))

  const [height, width] = [board.length, board[0].length]
  const neighbours = []
  paths.forEach((dir) => {
    const n = getNeighbour(row, col, dir, width, height, wrapMode)
    if (n) neighbours.push(n)
  })
  return neighbours
}
