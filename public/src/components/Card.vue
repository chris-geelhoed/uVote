<template>

  <div class="column is-one-third" ref="card">
    <router-link :to="route">
      <div class="card full-height">
        <div class="ribbons">
          <ribbon v-for="(choice, index) in poll.choices"
          :index="index"
          :key="index"
          :numberOfVotes="choice.votes"
          ></ribbon>
        </div>
        <div class="card-content full-height">
          <div class="content full-height">
            <div class="top-line">
              <div class="poll-title">
                  {{ poll.title }}
              </div>
              
              <div v-if="isHot" class="is-hot">
                <i class="fire fa fa-fire" aria-hidden="true"></i>
                hot
              </div>
            </div>

            <div class="time">{{ poll.formattedTimeCreated }}</div>

            <div class="votes"
            v-html="formattedVotesHtml">
              
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  import Ribbon from './Ribbon'
  import Velocity from 'velocity-animate'
  export default {
    name: 'Card',
    components: {
      Ribbon
    },
    props: [
      'index',
      'poll',
      'isHot'
    ],
    computed: {
      route () {
        return `poll/${this.poll.id}`
      },
      formattedVotesHtml () {
        if (this.poll.totalVotes === 1) {
          return `<strong>1</strong> vote`
        }
        return `<strong>${this.poll.totalVotes}</strong> votes`
      }
    },
    updated () {
      const el = this.$refs.card
      Velocity(el, {
        opacity: [1, 0]
      }, {
        duration: 500
      })
    }
  }
</script>
