<template>
<div class="columns">
  <div class="is-half is-offset-one-quarter column">

      <table class="grid unselectable" @mousedown="startDrag" @touchstart="startDrag" @mousemove="onDrag" @touchmove="onDrag"
      @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
          <tr v-for="(row, i) in heuristicGrid">
              <td v-for="(col, j) in row" :index-row="i" :index-col="j" v-bind:style="{ backgroundColor: getColor(col)}">
                {{col}}
              </td>
          </tr>
      </table>
  </div>

</div>

</template>

<script>
import * as AstarPlanning from 'astar-planning'
import { shadeColor2, red } from './util'
const { AStar, Planning, Util } = AstarPlanning.default
export default {
  name: 'grid',
  props: ['rows', 'cols'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dragging: false,
      grid: Util.create2DMap(this.rows, this.cols),
      heuristicGrid: Util.create2DArray(this.rows, this.cols),
      selectGoal: false,
      selectStart: false,
    }
  },
  methods: {
    startDrag: function (e) {
      const row = e.target.getAttribute('index-row')
      const col = e.target.getAttribute('index-col')
      const newVal = this.heuristicGrid[row][col] + 1
      if (newVal < 100)
        this.heuristicGrid[row].splice(col, 1, newVal)
      this.dragging = true

      console.log(e.x, e.y)
      },
    onDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        const row = e.target.getAttribute('index-row')
        const col = e.target.getAttribute('index-col')
        const newVal = this.heuristicGrid[row][col] + 1
        if (newVal < 100)
          this.heuristicGrid[row].splice(col, 1, newVal)
      }
    },
    stopDrag: function () {
      if (this.dragging) {
        this.dragging = false
      }
    },
    getColor(val) {
      const color = shadeColor2(red, 1 - val/100)
      return color
    }
  }
}
</script>

<style>
.grid { margin:1em auto; border-collapse:collapse }
.grid td {
    cursor:pointer;
    width:30px; height:30px;
    border:1px solid #ccc;
    text-align:center;
    font-family:sans-serif; font-size:13px;
    vertical-align: inherit;
}
*.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;

   /*
     Introduced in IE 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
   -ms-user-select: none;
   user-select: none;
}
</style>
