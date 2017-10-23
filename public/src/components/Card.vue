<template>

  <div class="column is-one-third">
    <router-link to="/">
      <div class="card">
        <div class="ribbons">
          <ribbon :numberOfVotes="3"></ribbon>
          <ribbon :numberOfVotes="7"></ribbon>
          <ribbon :numberOfVotes="7"></ribbon>
          <ribbon :numberOfVotes="2"></ribbon>
        </div>
        <div class="card-content">
          <div class="content">
            Tabs or Spaces?
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
    data () {
      return {
        votes: [6, 4]
      }
    }
  }
</script>
