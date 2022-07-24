<template lang="pug">
.cell(
  ref="cell"
  :class="{ locked: isLocked }"
  @click="rotateCell()"
  @contextmenu.prevent="lockCell()"
)
  img.source(
    v-if="isSource"
    src="../assets/img/pipes/source.svg"
  )
  div.rotating( :style="rotatingStyle" )
    .water(
      v-if="isConnected"
      :style="waterStyle"
    )
    img.pipe(
      :src="require(`@/assets/img/pipes/${type}.svg`)"
    )
</template>

<script>
export default {
  props: {
    type: String,
    rotation: Number,
    isConnected: Boolean,
    isLocked: Boolean,
    isSource: Boolean,
  },
  emits: ['update:rotation', 'update:isLocked', 'cell-rotated'],
  data() {
    return {
      fullSpins: 0,
    }
  },
  computed: {
    rotationDegrees() {
      return 90 * this.rotation + 360 * this.fullSpins
    },
    rotatingStyle() {
      return { transform: `rotate(${this.rotationDegrees}deg)` }
    },
    waterStyle() {
      const mask = require(`@/assets/img/pipes/mask${this.type}.svg`)
      const water = require(`@/assets/img/pipes/water1.png`)
      return {
        'mask-image': `url(${mask})`,
        '--waterImage': `url(${water})`,
        '--waterTransform': `rotate(${-this.rotationDegrees}deg)`,
      }
    },
  },
  methods: {
    rotateCell() {
      const { isLocked, rotation } = this
      if (isLocked) return

      const value = rotation === 3 ? 0 : rotation + 1
      if (value === 0) this.fullSpins++
      this.$emit('update:rotation', value)
      this.$emit('cell-rotated', value)
    },
    lockCell() {
      this.$emit('update:isLocked', !this.isLocked)
    },
  },
}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  background-color: rgb(105, 119, 133);
  user-select: none;
  cursor: pointer;
  // margin: 1px;
  border: 1px solid rgba(159, 166, 175, 0.5);
}

.cell img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &.source {
    z-index: 1;
  }
}

.water {
  width: 100%;
  height: 100%;
  mask-size: cover;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: var(--waterImage) center/cover;
    transform: var(--waterTransform);
    z-index: 200;
  }
}

.rotating {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-out;
}

.locked {
  filter: brightness(70%);
}
</style>
