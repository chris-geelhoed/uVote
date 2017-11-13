<template>
  <div id="app">
    <site-header :activeSearch="activeSearch"></site-header>

    <keep-alive>
      <transition name="fade">
        <new-poll-modal v-if="showNewPollModal"
        :showNewPollSuccess="showNewPollSuccess"
        :newPollTitle="newPollTitle"
        :newPollChoices="newPollChoices"
        :canAddChoice="canAddChoice"
        :canMakePoll="canMakePoll"
        :lastPollId="lastPollId"
        >
        </new-poll-modal>
      </transition>
    </keep-alive>

    <transition name="fade" mode="out-in">
      <router-view :sortedPolls="sortedPolls"
      :sortPollsBy="sortPollsBy"
      :activeChoiceId="activeChoiceId"
      :topHottestPollIds="topHottestPollIds"
      :numberOfPollsToShow="numberOfPollsToShow"
      />
    </transition>
    
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

// from underscore 1.8.3
function throttle (func, wait, options) {
  var context, args, result
  var timeout = null
  var previous = 0
  if (!options) options = {}
  var later = function () {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function () {
    var now = Date.now()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
};

export default {
  name: 'app',
  components: {
    SiteHeader,
    NewPollModal
  },
  data () {
    return {
      showNewPollModal: false,
      showNewPollSuccess: false,
      newPollTitle: '',
      newPollChoices: emptyNewPollChoices,
      polls: [],
      sortPollsBy: 'popular',
      activeChoiceId: '',
      activeSearch: '',
      dataIsLoading: false,
      numberOfPollsToShow: 15
    }
  },
  computed: {
    choicesWithText () {
      return this.newPollChoices.filter(choice => choice)
    },
    canAddChoice () {
      return this.newPollChoices.length < 4
    },
    canMakePoll () {
      return this.choicesWithText.length > 1 && this.newPollTitle
    },
    searchedPolls () {
      return this.polls.slice().filter(poll => {
        const textToSearch = poll.choices.reduce((textToSearch, choice) => {
          return textToSearch + choice.text
        }, poll.title).toLowerCase()

        return textToSearch.includes(this.activeSearch.toLowerCase())
      })
    },
    sortedPollsByMostPopular () {
      return this.searchedPolls.slice().sort((pollA, pollB) => {
        return pollB.totalVotes - pollA.totalVotes
      })
    },
    sortedPollsByMostRecent () {
      return this.searchedPolls.slice().sort((pollA, pollB) => {
        return pollB.timeCreated - pollA.timeCreated
      })
    },
    sortedPollsByMostHot () {
      return this.searchedPolls.slice().sort((pollA, pollB) => {
        return pollB.hotness - pollA.hotness
      })
    },
    topHottestPollIds () {
      return this.sortedPollsByMostHot.slice(0, 5).map(poll => poll.id)
    },
    lastPollId () {
      if (this.sortedPollsByMostRecent.length) {
        return this.sortedPollsByMostRecent[0].id
      }
    },
    sortedPolls () {
      if (this.sortPollsBy === 'popular') {
        return this.sortedPollsByMostPopular.slice()
      }
      if (this.sortPollsBy === 'recent') {
        return this.sortedPollsByMostRecent.slice()
      }
      if (this.sortPollsBy === 'hot') {
        return this.sortedPollsByMostHot.slice()
      }
      return this.searchedPolls
    }
  },
  methods: {
    submitVote (pollId) {
      if (!this.dataIsLoading) {
        this.dataIsLoading = true
        window.axios.post('/api/vote', {
          pollId: pollId,
          choiceId: this.activeChoiceId
        })
          .then(response => {
            if (response.data.voteWasSuccessful) {
              this.dataIsLoading = false
              this.getPollsFromDb()
            }
          })
      }
    },
    updateActiveChoiceId (activeChoiceId) {
      this.activeChoiceId = activeChoiceId
    },
    updateSortPollsBy (sortPollsBy) {
      this.sortPollsBy = sortPollsBy
    },
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
    updateSearch (newSearch) {
      this.activeSearch = newSearch
    },
    updateChoice (newChoice, indexToChange) {
      this.newPollChoices = this.newPollChoices.map((choice, index) => {
        return index === indexToChange ? newChoice : choice
      })
    },
    getPollsFromDb () {
      if (!this.dataIsLoading) {
        this.dataIsLoading = true
        window.axios.get('/api/poll')
        .then(response => {
          this.polls = response.data
          this.dataIsLoading = false
        })
      }
    },
    createPoll () {
      if (!this.dataIsLoading) {
        this.dataIsLoading = true
        window.axios.post('/api/poll', {
          title: this.newPollTitle,
          choices: this.choicesWithText
        })
          .then(response => {
            this.dataIsLoading = false
            this.getPollsFromDb()
            return wait(200)
          })
          .then(response => {
            this.newPollTitle = ''
            this.newPollChoices = emptyNewPollChoices
            this.showNewPollSuccess = true
            this.dataIsLoading = false
          })
      }
    }
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
    window.bus.$on('searchUpdated', this.updateSearch)
    window.bus.$on('createPollClicked', this.createPoll)
    window.bus.$on('tabWasClicked', this.updateSortPollsBy)
    window.bus.$on('pollChoiceWasClicked', this.updateActiveChoiceId)
    window.bus.$on('pollChoiceWasSubmitted', this.submitVote)

    window.onscroll = throttle(() => {
      const buffer = 10
      const hasScrolledToBottom = window.innerHeight + window.pageYOffset + buffer >= document.body.offsetHeight
      if (hasScrolledToBottom) {
        this.numberOfPollsToShow += 3
      }
    }, 800, { leading: false })
  }
}
</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
