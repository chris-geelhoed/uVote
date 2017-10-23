<template>
    <div class="tabs">
        <ul>
          <li class="is-active"><a>Popular</a></li>
          <li><a>Recent</a></li>
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
  methods: {
    handleNewPollClick () {
      window.bus.$emit('newPollClicked')
    }
  }
}
</script>
