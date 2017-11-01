<template>
  <div class="choice field">
    <div class="control has-close-button">
      <input :value="choice"
      @input="handleChange"
      class="input"
      type="text"
      placeholder="">
      <button @click="handleClick"
      class="delete" aria-label="close"></button>
    </div>
  </div>
</template>
<script>
  import Velocity from 'velocity-animate'
  export default {
    name: 'Choice',
    props: [
      'index',
      'choice'
    ],
    methods: {
      handleClick (event) {
        const parent = event.target.parentNode.parentNode
        Velocity(parent,
          {
            opacity: [0, 1]
          },
          {
            duration: 200,
            complete: () => {
              window.bus.$emit('deleteChoiceClicked', this.index)
              parent.style.opacity = '1'
            }
          })
      },
      handleChange (event) {
        window.bus.$emit('choiceUpdated', event.target.value, this.index)
      }
    }
  }
</script>
