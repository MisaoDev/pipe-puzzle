import { UP, DOWN, LEFT, RIGHT } from '@/utils/directions'

const cellTypes = {
  I: { paths: [RIGHT, LEFT] },
  T: { paths: [UP, RIGHT, LEFT] },
  O: { paths: [RIGHT] },
  L: { paths: [UP, RIGHT] },
  X: { paths: [UP, RIGHT, DOWN, LEFT] },
}

export default cellTypes
