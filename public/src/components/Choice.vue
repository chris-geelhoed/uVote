<template>
  <div class="choice field">
    <div class="control has-close-button">
      <input @input="handleInputChange"
      class="input"
      type="text"
      placeholder="Text input">
      <button @click="handleClick"
      class="delete" aria-label="close"></button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Choice',
    props: [
      'index',
      'choice'
    ],
    methods: {
      handleClick () {
        window.bus.$emit('deleteChoiceClicked', this.index)
      },
      handleInputChange (event) {
        window.bus.$emit('choiceUpdated', event.target.value, this.index)
      }
    }
  }
</script>
