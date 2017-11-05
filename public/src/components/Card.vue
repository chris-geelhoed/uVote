<template>

  <div class="column is-one-third">
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
            {{ poll.title }}
            <br>
            <br>
            <div class="time">{{ poll.formattedTimeCreated }}</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
  import Ribbon from './Ribbon'
  export default {
    name: 'Card',
    components: {
      Ribbon
    },
    props: [
      'index',
      'poll'
    ],
    computed: {
      route () {
        return `poll/${this.poll.id}`
      }
    }
  }
</script>
