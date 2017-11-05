<template>
  <div id="content" class="site-content layout-container">
    <div id="primary" class="content-area layout-row">
        <tabs :sortPollsBy="sortPollsBy" ></tabs>
        <div class="columns is-multiline is-variable is-3">
          <card v-for="(poll, index) in sortedPolls"
          :index="index"
          :key="index"
          :poll="poll"
          ></card>
        </div>
    </div>
  </div>
</template>

<script>
import Tabs from './Tabs'
import Card from './Card'

export default {
  name: 'Home',
  components: {
    Tabs,
    Card
  },
  props: [
    'sortedPolls',
    'sortPollsBy'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>