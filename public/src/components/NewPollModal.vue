<template>
  <div class="new-poll-modal modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button @click="handleCloseClick" class="delete" aria-label="close"></button>
      </header>

      <section class="modal-card-body">

        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input v-model="newPollForm.name" class="input" type="text" placeholder="Text input">
          </div>
        </div>

        <label class="label">Choices</label>

        <div class="choices">
          <choice v-for="(choice, index) in newPollForm.choices"
          :choice="choice"
          :index="index"
          :key="index"
          ></choice>
        </div>

      </section>

      <footer class="modal-card-foot">

        <button :disabled="!canMakePoll"
        @click="handleCreatePoll"
        class="button is-success">Make Poll</button>

        <button :disabled="!canAddChoice"
        @click="handleAddChoice"
        class="button is-success">Add Choice</button>
        
        <button @click="handleCloseClick"
        class="button">Cancel</button>

      </footer>
    </div>
  </div>
</template>
<script>
  import Choice from './Choice'

  export default {
    name: 'NewPollModal',
    components: {
      Choice
    },
    props: [
      'newPollForm',
      'canAddChoice',
      'canMakePoll'
    ],
    methods: {
      handleCloseClick () {
        window.bus.$emit('modalCloseClicked', 'newPoll')
      },
      handleAddChoice () {
        window.bus.$emit('addChoiceClicked')
      },
      handleCreatePoll () {
        window.bus.$emit('createPollClicked')
      }
    }
  }
</script>