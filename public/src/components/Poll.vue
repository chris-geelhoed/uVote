<template>
  <div id="content" class="site-content layout-container">
    <div id="primary" class="content-area layout-row">
      <div class="poll-container">

        <div class="poll-header">
          <h3 class="poll-title">{{ poll.title }}</h3>
        </div>
        
        <div class="poll-body columns">

          <div class="right-container column is-two-thirds">
            <div class="graph">

              <div class="graph-inner">
                <bar v-for="(choice, index) in poll.choices"
                :index="index"
                :key="index"
                :votes="choice.votes"
                :scaleHeight="scaleHeight"
                ></bar>
              </div>

              <transition name="fade">
                <div v-if="!hasVotes" class="no-votes-yet">
                  This poll has not received any votes yet
                </div>
              </transition>

            </div>
          </div>

          <div class="left-container column is-one-third">
            <div class="poll-choice-buttons-container full-height">

              <poll-button v-for="(choice, index) in poll.choices"
              :index="index"
              :key="index"
              :choice="choice"
              :activeChoiceId="activeChoiceId"
              ></poll-button>

              <a class="submit-button button"
              @click="handleSubmitClick">
                Submit
              </a>

            </div>
          </div>

          

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PollButton from './PollButton'
import Bar from './Bar'
export default {
  name: 'Poll',
  components: {
    PollButton,
    Bar
  },
  props: [
    'sortedPolls',
    'activeChoiceId'
  ],
  computed: {
    poll () {
      const id = this.$route.params.id
      const activePoll = this.sortedPolls.filter(poll => {
        return poll.id === id
      })

      if (activePoll.length) {
        return activePoll[0]
      }
      return ''
    },
    votes () {
      if (this.poll.choices) {
        return this.poll.choices.map(choice => choice.votes)
      }
    },
    hasVotes () {
      if (this.poll.choices) {
        return this.votes.reduce((totalVotes, choice) => {
          return totalVotes + choice
        }, 0)
      }
    },
    scaleHeight () {
      const maxHeight = Math.max(...this.votes)
      return maxHeight || 1
    }
  },
  methods: {
    handleSubmitClick () {
      window.bus.$emit('pollChoiceWasSubmitted', this.poll.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
