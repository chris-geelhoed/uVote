<template>
    <div id="content" class="site-content layout-container">
        <div id="primary" class="content-area layout-row">
            <tabs :modalsToShow="modalsToShow"></tabs>
            <div class="columns is-multiline is-variable is-3">
              <card v-for="(poll, index) in polls"
              :index="index"
              :key="index"
              :title="poll.title"
              :choices="poll.choices"
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
    'message',
    'modalsToShow',
    'polls'
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>