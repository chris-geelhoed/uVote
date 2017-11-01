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
        const button = event.target
        const input = event.target.previousElementSibling
        input.value = ''
        Velocity(button, { opacity: [0, 1] }, { duration: 200,
          complete: () => {
            button.style.display = 'none'
            Velocity(input, { scaleX: [0, 1] }, { duration: 300 })
            Velocity(input, { maxHeight: ['0px', '36px'], opacity: [0, 1] }, {
              duration: 100,
              easing: 'ease-in',
              complete: () => {
                window.bus.$emit('deleteChoiceClicked', this.index)
                input.style.transform = 'scaleX(1)'
                input.style.maxHeight = '36px'
                input.style.opacity = '1'
                button.style.opacity = '1'
                button.style.display = 'block'
              }
            })
          }
        })
      },
      handleChange (event) {
        window.bus.$emit('choiceUpdated', event.target.value, this.index)
      }
    }
  }
</script>
