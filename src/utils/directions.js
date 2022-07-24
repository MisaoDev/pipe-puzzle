export const UP = 0
export const RIGHT = 1
export const DOWN = 2
export const LEFT = 3

export const shiftDirection = (dir, turns = 1) => (dir + turns) % 4
