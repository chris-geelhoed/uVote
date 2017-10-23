<template>
  <div id="app">
    <site-header></site-header>

    <keep-alive>
      <new-poll-modal v-if="modals.newPoll.show"
      :newPollForm="newPollForm"
      :canAddChoice="canAddChoice"
      :canMakePoll="canMakePoll">
      </new-poll-modal>
    </keep-alive>

    <router-view
    :message="message"/>
  </div>
</template>

<script>
import SiteHeader from './components/siteheader'
import NewPollModal from './components/NewPollModal'
export default {
  name: 'app',
  components: {
    SiteHeader,
    NewPollModal
  },
  data () {
    return {
      message: 'hello world',
      modals: {
        newPoll: {
          show: false
        }
      },
      newPollForm: {
        name: '',
        choices: ['', '', '', '']
      }
    }
  },
  computed: {
    canAddChoice () {
      return this.newPollForm.choices.length < 4
    },
    choicesWithText () {
      return this.newPollForm.choices.filter(choice => choice)
    },
    canMakePoll () {
      return this.newPollForm.name && this.choicesWithText.length > 1
    }
  },
  methods: {
    handleModalClick (name, shouldShow = false) {
      let modalsCopy = window._.cloneDeep(this.modals)
      modalsCopy[name].show = shouldShow
      this.modals = modalsCopy
    },
    deleteChoice (indexToDelete) {
      let newPollFormsCopy = window._.cloneDeep(this.newPollForm)
      newPollFormsCopy.choices.splice(indexToDelete, 1)
      this.newPollForm = newPollFormsCopy
    },
    addChoice () {
      let newPollFormsCopy = window._.cloneDeep(this.newPollForm)
      newPollFormsCopy.choices.push('')
      this.newPollForm = newPollFormsCopy
    },
    updateChoice (newChoice, indexToChange) {
      let newPollFormsCopy = window._.cloneDeep(this.newPollForm)
      newPollFormsCopy.choices[indexToChange] = newChoice
      this.newPollForm = newPollFormsCopy
    },
    createPoll () {
      console.log(this.newPollForm.name)
      console.log(this.choicesWithText)
      // this.handleModalClick('newPoll')
    }
  },
  mounted () {
    window.axios.post('/api/poll')
      .then(response => {
        console.log(response.data)
      })

    window.bus.$on('newPollClicked', this.handleModalClick.bind(this, 'newPoll', true))
    window.bus.$on('modalCloseClicked', this.handleModalClick)
    window.bus.$on('deleteChoiceClicked', this.deleteChoice)
    window.bus.$on('addChoiceClicked', this.addChoice)
    window.bus.$on('choiceUpdated', this.updateChoice)
    window.bus.$on('createPollClicked', this.createPoll)
  }
}
</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
