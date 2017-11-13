<template>
  <header id="masthead" class="site-header layout-container box">

    <router-link to="/">
    <div class="site-branding">
      <div class="bars">
        <div class="y-axis"></div>
        <div class="x-axis"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <h1 class="site-title"><b>u</b>Vote</h1>
    </div>
  </router-link>

    <div class="search-container">
      <input class="input search"
      :value="activeSearch"
      @input="handleSearchChange"
      @focus="handleFocus"
      type="text"
      placeholder="Search for a poll (eg 'tabs or spaces?')">
    </div>

  </header>
</template>
<script>
  export default {
    name: 'site-header',
    props: [
      'activeSearch'
    ],
    methods: {
      handleSearchChange (event) {
        window.bus.$emit('searchUpdated', event.target.value)
      },
      handleFocus () {
        this.$router.push('/')
      }
    }
  }
</script>
