<template>
  <div id="app">
    <site-header></site-header>

    <keep-alive>
      <transition name="fade">
        <new-poll-modal v-if="showNewPollModal"
        :showNewPollSuccess="showNewPollSuccess"
        :newPollChoices="newPollChoices"
        :canAddChoice="canAddChoice"
        :canMakePoll="canMakePoll">
        </new-poll-modal>
      </transition>
    </keep-alive>

    <router-view/>
  </div>
</template>

<script>
import SiteHeader from './components/siteheader'
import NewPollModal from './components/NewPollModal'

function wait (delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay)
  })
}

export default {
  name: 'app',
  components: {
    SiteHeader,
    NewPollModal
  },
  data () {
    return {
      userId: '',
      showNewPollModal: false,
      showNewPollSuccess: false,
      newPollChoices: ['', '', '', '']
    }
  },
  computed: {
    canAddChoice () {
      return this.newPollChoices.length < 4
    },
    choicesWithText () {
      return this.newPollChoices.filter(choice => choice)
    },
    canMakePoll () {
      return this.choicesWithText.length > 1
    }
  },
  methods: {
    toggleNewPollModal (shouldShow) {
      this.showNewPollModal = shouldShow
    },
    deleteChoice (indexToDelete) {
      this.newPollChoices = this.newPollChoices.filter((choice, index) => {
        return index !== indexToDelete
      })
    },
    addChoice () {
      this.newPollChoices = this.newPollChoices.concat('')
    },
    updateChoice (newChoice, indexToChange) {
      this.newPollChoices = this.newPollChoices.map((choice, index) => {
        return index === indexToChange ? newChoice : choice
      })
    },
    createPoll () {
      window.axios.post('/api/poll', {
        userId: this.userId,
        choices: this.choicesWithText
      })
        .then(response => {
          return wait(400)
        })
        .then(response => {
          this.showNewPollSuccess = true
          return wait(1200)
        })
    }
  },
  beforeCreate () {
    window.axios.post('/api/user')
      .then(response => {
        this.userId = response.data.userId
      })
  },
  mounted () {
    window.bus.$on('newPollClicked', this.toggleNewPollModal.bind(this, true))
    window.bus.$on('modalCloseClicked', this.toggleNewPollModal.bind(this, false))
    window.bus.$on('deleteChoiceClicked', this.deleteChoice)
    window.bus.$on('addChoiceClicked', this.addChoice)
    window.bus.$on('choiceUpdated', this.updateChoice)
    window.bus.$on('createPollClicked', this.createPoll)
  }
}
</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
