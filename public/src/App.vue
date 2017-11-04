<template>
  <div id="app">
    <site-header></site-header>

    <keep-alive>
      <transition name="fade">
        <new-poll-modal v-if="showNewPollModal"
        :showNewPollSuccess="showNewPollSuccess"
        :newPollTitle="newPollTitle"
        :newPollChoices="newPollChoices"
        :canAddChoice="canAddChoice"
        :canMakePoll="canMakePoll">
        </new-poll-modal>
      </transition>
    </keep-alive>

    <router-view :polls="polls"/>
    
  </div>
</template>

<script>
import SiteHeader from './components/siteheader'
import NewPollModal from './components/NewPollModal'

const emptyNewPollChoices = ['', '']

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
      newPollTitle: '',
      newPollChoices: emptyNewPollChoices,
      polls: []
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
      return this.choicesWithText.length > 1 && this.newPollTitle
    }
  },
  methods: {
    toggleNewPollModal (shouldShow) {
      this.showNewPollModal = shouldShow
      this.showNewPollSuccess = false
    },
    deleteChoice (indexToDelete) {
      this.newPollChoices = this.newPollChoices.filter((choice, index) => {
        return index !== indexToDelete
      })
    },
    addChoice () {
      this.newPollChoices = this.newPollChoices.concat('')
    },
    updateTitle (newTitle) {
      this.newPollTitle = newTitle
    },
    updateChoice (newChoice, indexToChange) {
      this.newPollChoices = this.newPollChoices.map((choice, index) => {
        return index === indexToChange ? newChoice : choice
      })
    },
    getPollsFromDb () {
      window.axios.get('/api/poll')
      .then(response => {
        this.polls = response.data
        console.log(response.data)
      })
    },
    createPoll () {
      window.axios.post('/api/poll', {
        userId: this.userId,
        title: this.newPollTitle,
        choices: this.choicesWithText
      })
        .then(response => {
          this.getPollsFromDb()
          return wait(200)
        })
        .then(response => {
          this.newPollTitle = ''
          this.newPollChoices = emptyNewPollChoices
          this.showNewPollSuccess = true
        })
    }
  },
  beforeCreate () {
    window.axios.post('/api/user')
      .then(response => {
        this.userId = response.data.userId
      })
  },
  created () {
    this.getPollsFromDb()
  },
  mounted () {
    window.bus.$on('newPollClicked', this.toggleNewPollModal.bind(this, true))
    window.bus.$on('modalCloseClicked', this.toggleNewPollModal.bind(this, false))
    window.bus.$on('deleteChoiceClicked', this.deleteChoice)
    window.bus.$on('addChoiceClicked', this.addChoice)
    window.bus.$on('choiceUpdated', this.updateChoice)
    window.bus.$on('titleUpdated', this.updateTitle)
    window.bus.$on('createPollClicked', this.createPoll)
  }
}
</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
