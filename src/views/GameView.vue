<template lang="pug">
div
  h1 Pipes
  o-button( rounded variant="primary" ) Reiniciar
  GameBoard
</template>

<script>
import GameBoard from '@/components/GameBoard.vue'
export default { components: { GameBoard } }
</script>

<style lang="scss" scoped></style>
