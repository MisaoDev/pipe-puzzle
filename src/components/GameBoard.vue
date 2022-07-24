<template lang="pug">
.board
  .board-row( v-for="row,i in board" :key="i" )
    PipeCell(
      v-for="cell,j in row"
      :key="j"
      ref='cell'
      :type = "cell.type"
      v-model:rotation = "cell.rotation"
      v-model:isConnected = "cell.isConnected"
      v-model:isLocked = "cell.isLocked"
      v-model:isSource = "cell.isSource"
      @cell-rotated = "checkBoard()"
    )

.data( style="margin-top: 40px; display: flex; justify-content: center;" )
  pre( style="text-align: left; font-size: 18px;")
    | {{ JSON.stringify(board, null, 2) }}
</template>

<script>
import PipeCell from './PipeCell.vue'
import { UP, DOWN, LEFT, RIGHT, shiftDirection } from '@/utils/directions' // eslint-disable-line
import cellTypes from '@/utils/cellTypes' // eslint-disable-line
import { getNeighbours } from '@/utils/navigation'

const getRand = (n) => Math.floor(Math.random() * n)
const getRandomPipe = () => ['I', 'T', 'O', 'L', 'X'][getRand(5)]

export default {
  data() {
    return {
      board: [],
      sourceCoorX: null,
      sourceCoorY: null,
    }
  },
  components: { PipeCell },
  methods: {
    buildBoard() {
      const { board } = this

      ;[...Array(10)].forEach(() => {
        const row = [...Array(10)].map(() => ({
          type: getRandomPipe(),
          rotation: getRand(4),
          isConnected: false,
          isLocked: false,
          isSource: false,
        }))
        board.push(row)
      })

      this.sourceCoorX = getRand(10)
      this.sourceCoorY = getRand(10)
      const sourceCell = board[this.sourceCoorX][this.sourceCoorY]
      sourceCell.isSource = true
      sourceCell.isConnected = true
      this.checkBoard()
    },
    connectCell(row, col) {
      const { board } = this
      board[row][col].isConnected = true

      const neighbours = getNeighbours(row, col, board)
      neighbours.forEach((n) => {
        const cell = board[n.row][n.col]
        if (cell.isConnected) return

        const cellNeighbours = getNeighbours(n.row, n.col, board)
        if (cellNeighbours.find((c) => c.row === row && c.col === col)) {
          this.connectCell(n.row, n.col)
        }
      })
    },
    checkBoard() {
      this.board.forEach((row) =>
        row.forEach((cell) => (cell.isConnected = false)),
      )
      this.connectCell(this.sourceCoorX, this.sourceCoorY)
    },
  },
  created() {
    this.buildBoard()
  },
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.board-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
