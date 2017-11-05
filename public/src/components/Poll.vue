<template>
  <div id="content" class="site-content layout-container">
    <div id="primary" class="content-area layout-row">
      <div class="poll-container columns">
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
        <div class="graph-container column is-two-thirds">
          <div class="graph full-height"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PollButton from './PollButton'
export default {
  name: 'Poll',
  components: {
    PollButton
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
    }
  },
  methods: {
    handleSubmitClick () {
      window.bus.$emit('pollChoiceWasSubmitted')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  li {
    a {
      color: blue;
    }
  }
}


ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
