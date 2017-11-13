<template>
  <div class="new-poll-modal modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card" ref="card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create New Poll</p>
        <button @click="handleCloseClick" class="delete" aria-label="close"></button>
      </header>

      <transition name="fade" mode="out-in">

        <section v-if="showNewPollSuccess" key="body-1" class="modal-card-body success">
            <i class="fa fa-check-circle" aria-hidden="true"></i>
        </section>

        <section v-else key="body-2" class="modal-card-body">

          <label class="label">Title</label>

          <div class="title field">
            <div class="control has-close-button">

              <input :value="newPollTitle"
              @input="handleTitleChange"
              class="input"
              type="text"
              maxLength="20"
              placeholder="">

            </div>
          </div>

          <label class="label">Choices</label>

          <div class="choices">
            <transition-group
            mode="out-in"
            :css="false"
            @before-enter="beforeEnter"
            @enter="enter">
              <choice v-for="(choice, index) in newPollChoices"
              :choice="choice"
              :index="index"
              :key="index"
              ></choice>
            </transition-group>
          </div>

        </section>

      </transition>

      <transition name="fade" mode="out-in">

        <footer v-if="showNewPollSuccess" key="footer-1" class="modal-card-foot">

            <button class="button is-primary"
            @click="handleSeePollClick">
              See Poll
            </button>
            
            <button @click="handleCloseClick"
            class="button">
              Close
            </button>

        </footer>

        <footer v-else key="footer-2" class="modal-card-foot">
        
          <button :disabled="!canMakePoll"
          @click="handleCreatePoll"
          class="button is-primary">Make Poll</button>

          <button :disabled="!canAddChoice"
          @click="handleAddChoice"
          key="button-2"
          class="button is-primary">Add Choice</button>

        </footer>

      </transition>
    </div>
  </div>
</template>
<script>
  import Choice from './Choice'
  import Velocity from 'velocity-animate'

  export default {
    name: 'NewPollModal',
    components: {
      Choice
    },
    props: [
      'showNewPollSuccess',
      'newPollTitle',
      'newPollChoices',
      'canAddChoice',
      'canMakePoll',
      'lastPollId'
    ],
    computed: {
      route () {
        return `poll/${this.lastPollId}`
      }
    },
    methods: {
      handleCloseClick () {
        window.bus.$emit('modalCloseClicked', 'newPoll')
      },
      handleAddChoice () {
        window.bus.$emit('addChoiceClicked')
      },
      handleCreatePoll () {
        window.bus.$emit('createPollClicked')
      },
      handleTitleChange (event) {
        window.bus.$emit('titleUpdated', event.target.value)
      },
      handleSeePollClick () {
        this.$router.push(this.route)
        this.handleCloseClick()
      },
      beforeEnter (el, done) {
        el.style.opacity = '0'
      },
      enter (el, done) {
        Velocity(el,
          {
            opacity: [1, 0]
          },
          {
            duration: 300,
            complete: done
          })
      }
    }
  }
</script>