<template>
    <div class="tabs">
        <ul>

          <li :class="{ 'is-active': sortByPopular }"
          @click="handlePopularClick">
            <a>Popular</a>
          </li>

          <li :class="{ 'is-active': sortByRecent }"
          @click="handleRecentClick">
            <a>Recent</a>
          </li>

          <li class="new-poll">
            <a @click="handleNewPollClick"
            class="button is-primary" to="/">New Poll</a>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: [
    'sortPollsBy'
  ],
  computed: {
    sortByPopular () {
      return this.sortPollsBy === 'popular'
    },
    sortByRecent () {
      return this.sortPollsBy === 'recent'
    }
  },
  methods: {
    handleNewPollClick () {
      window.bus.$emit('newPollClicked')
    },
    handlePopularClick () {
      window.bus.$emit('tabWasClicked', 'popular')
    },
    handleRecentClick () {
      window.bus.$emit('tabWasClicked', 'recent')
    }
  }
}
</script>
