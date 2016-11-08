<template>
  <div id="app" @touchmove.prevent>
    <div class="content">
      <h1>A* Planning Example</h1>
    </div>
    <div>
      <grid :rows="rows" :cols="cols">
      </grid>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>A* Planner</strong> by <a href="http://jeremybyu.github.io/aboutme/">Jeremy Castagno</a>. The A* visualization source code is free and located at
            <a href="https://github.com/JeremyBYU/astar-visualization">Github</a>. The A* implementation algorithm (written in Typescript) is open source and located <a href="https://github.com/JeremyBYU/astar-planning">here</a>.
          </p>
          <p>
            <a class="icon" href="https://github.com/JeremyBYU">
              <i class="fa fa-github"></i>
            </a>
          </p>
        </div>
      </div>
    </footer>
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
  
  @media (max-width: 768px) {
    #app {
      margin-top: 20px;
    }
  }
</style>