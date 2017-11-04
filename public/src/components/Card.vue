<template>

  <div class="column is-one-third">
    <router-link to="/">
      <div class="card full-height">
        <div class="ribbons">
          <ribbon v-for="(choice, index) in choices"
          :index="index"
          :key="index"
          :numberOfVotes="choice.votes"
          ></ribbon>
        </div>
        <div class="card-content full-height">
          <div class="content full-height">
            {{ title }}
            <br>
            <br>
            <div class="time">Yesterday</div>
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
      'title',
      'choices'
    ]
  }
</script>
