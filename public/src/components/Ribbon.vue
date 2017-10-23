<template>
  <div class="ribbon"
  :style="{ width: ribbonWidth }"></div>
</template>
<script>
  export default {
    name: 'Ribbon',
    props: [
      'numberOfVotes'
    ],
    computed: {
      ribbonWidth () {
        return `${this.numberOfVotes * 100}%`
      }
    }
  }
</script>
