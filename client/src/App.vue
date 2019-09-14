<template>
  <div id="app">
    <issueList msg="Welcome in Issue tracker"/>
  </div>
</template>

<script>
import IssueList from './components/IssueList.vue'

export default {
  name: 'app',
  components: {
    IssueList
  }
}
</script>

<style lang="scss">
    @import './scss/style.scss';
</style>
