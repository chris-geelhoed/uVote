<template>
  <div class="bar"
  :style="{ height: height }"
  ></div>
</template>
<script>
export default {
  name: 'Bar',
  props: [
    'votes',
    'scaleHeight'
  ],
  computed: {
    height () {
      return `${(100 * this.votes) / this.scaleHeight}%`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
