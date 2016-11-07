<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div>
    <grid :rows="rows" :cols="cols">

    </grid>
    </div>
  </div>

</template>

<script>
import Grid from './Grid.vue'
export default {
  name: 'app',
  components: {
    Grid
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      rows: 10,
      cols: 10
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
