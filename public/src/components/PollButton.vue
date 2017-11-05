<template>
  <a class="button poll-button"
  :class="{ active: isActive }"
  @click="handleClick">

    <div class="text">
      {{ choice.text }}
    </div>

    <div class="letter">
      {{ letter }}
    </div>
    
  </a>
</template>
<script>
  export default {
    name: 'PollButton',
    props: [
      'index',
      'choice',
      'activeChoiceId'
    ],
    computed: {
      letter () {
        const letters = [ 'a', 'b', 'c', 'd' ]
        return letters[this.index]
      },
      isActive () {
        return this.choice.id === this.activeChoiceId
      }
    },
    methods: {
      handleClick () {
        window.bus.$emit('pollChoiceWasClicked', this.choice.id)
      }
    }
  }
</script>
