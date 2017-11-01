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

          <label class="label">Choices</label>

          <div class="choices">
            <transition-group name="fade"
            mode="out-in"
            :css="false"
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter">
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

            <button @click="handleSeePoll"
            class="button is-primary">See Poll</button>
            
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
          
          <button @click="handleCloseClick"
          class="button">
            Cancel
          </button>

        </footer>

      </transition>
    </div>
  </div>
</template>
<script>
  import Choice from './Choice'
  import Velocity from 'velocity-animate'

  function findDelete (el) {
    return el.querySelector('.choice .delete')
  }

  function findInput (el) {
    return el.querySelector('.choice .input')
  }

  export default {
    name: 'NewPollModal',
    components: {
      Choice
    },
    props: [
      'showNewPollSuccess',
      'newPollChoices',
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
      },
      handleSeePoll () {

      },
      beforeEnter (el, done) {
        findDelete(el).style.opacity = '0'
      },
      enter (el, done) {
        const input = findInput(el)
        input.style.transform = 'scaleX(0)'
        Velocity(input, { maxHeight: ['36px', '0px'], opacity: [1, 0] }, { duration: 100 })
        Velocity(input, { scaleX: [1, 0] }, { duration: 300, complete: done })
      },
      afterEnter (el, done) {
        Velocity(findDelete(el), { opacity: [1, 0] }, { duration: 200, complete: done })
      }
    }
  }
</script>