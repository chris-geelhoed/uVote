<template>
  <div class="bar"
  :style="{ height: height }"
  >
    <div class="letter">
      {{ letter }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Bar',
  props: [
    'index',
    'votes',
    'scaleHeight'
  ],
  computed: {
    height () {
      return `${(100 * this.votes) / this.scaleHeight}%`
    },
    letter () {
      const letters = [ 'a', 'b', 'c', 'd' ]
      return letters[this.index]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
