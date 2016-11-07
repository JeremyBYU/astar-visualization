<template>
<div>
  
  <div class="columns">
    <div class="column is-12" style="padding-bottom: 0px">
      <a class="button is-success"  @click="selectStart = !selectStart" :disabled="selectStart">
        <div v-show="!selectStart">Choose Starting Cell</div>
        <div v-show="selectStart">Click Any Cell</div>
      </a>
      <a class="button is-danger"  @click="selectGoal = !selectGoal" :disabled="selectGoal">
        <div v-show="!selectGoal">Choose End Cell</div>
        <div v-show="selectGoal">Click Any Cell</div>
      </a>
    </div>
  </div>
  <div class="columns">
    <div class="column is-12">
      <a class="button is-primary"  @click="findPath">
        <div>Find Path</div>
      </a>
      <a class="button is-warning"  @click="reset">
        <div>Reset</div>
      </a>
    </div>
  </div>
  <div class="columns">
    <div class="is-half is-offset-one-quarter column">
      <p>
        Touch/Click-Drag to build your Cost Map. <br> The darker the red, the more cost/penalty.
      </p>
      <table class="grid unselectable" @mousedown="startDrag" @touchstart="startDrag" @mousemove="onDrag" @touchmove="onDrag"
      @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag" >
          <tr v-for="(row, i) in heuristicGrid">
              <td v-for="(col, j) in row" :index-row="i" :index-col="j" v-bind:style="{ backgroundColor: getColor(col)}">
                <div :index-row="i" :index-col="j" class="circle" 
                :class="{ circle_green: isStart(i, j), circle_red: isEnd(i,j), circle_open: isOpen(i,j), circle_closed: isClosed(i,j), circle_path: isPath(i,j)}">

                </div>
                
              </td>
          </tr>
      </table>
    </div>

  </div>
</div>

</template>

<script>
import * as AstarPlanning from 'astar-planning'
import * as _ from 'lodash'
import { shadeColor2, red, create2DArray, costFunction } from './util'
const { AStar, Types, Util } = AstarPlanning.default

// const AStarPlanner = new AStar()
export default {
  name: 'grid',
  props: ['rows', 'cols'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dragging: false,                                    // Flag to determine if 
      heuristicGrid: create2DArray(this.rows, this.cols), // visualization grid
      selectGoal: false,                                  // Flag to indicate user want to select the goal
      selectStart: false,                                 // Flag to indicate user wants to select the starting position
      startCell: { x: 0, y: 0 },                          // Starting Cell
      endCell: { x: 9, y: 9 },                             // Ending Cell
      searching: false,
      cellPath: []                                        // Cell Path
    }
  },
  created() {
    this._astar = new AStar(this.totalCostFunction, this.heuristicFunction, {x: this.rows, y: this.cols })

  },
  methods: {
    startDrag: function (e) {
      const row = Number(e.target.getAttribute('index-row'))  // get row
      const col = Number(e.target.getAttribute('index-col'))  // get col
     //  debugger
      if (this.selectGoal){           // check if we are currently trying to set a goal
        this.endCell.x = row
        this.endCell.y = col
        this.selectGoal = false
      } else if(this.selectStart) {   // check if we are curretnly trying to set the starting cell
        this.startCell.x = row
        this.startCell.y = col
        this.selectStart = false
      } else {                        // we are trying to increment the heuristic cost function
        const hVal = this.heuristicGrid[row][col] + this.getIncrement(this.heuristicGrid[row][col])
        if (hVal < 100 && this.markableCell(row, col))    // only incremnt up to 100 and if its not a start or end goal
          this.heuristicGrid[row].splice(col, 1, hVal)
        this.dragging = true
      }
    },
    onDrag: function (e) {
      let element = null
      if (e.changedTouches) {
        element = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      } else {
        element = e.target;
      }
      if (this.dragging) {
        const row = Number(element.getAttribute('index-row'))
        const col = Number(element.getAttribute('index-col'))
        const hVal = this.heuristicGrid[row][col] + this.getIncrement(this.heuristicGrid[row][col])
        if (hVal < 100 && this.markableCell(row, col))
          this.heuristicGrid[row].splice(col, 1, hVal)
      }
    },
    stopDrag: function () {
      // debugger
      if (this.dragging) {
        this.dragging = false
      }
    },
    getIncrement(val) {
      if (val < 10){
        return 1
      } else if (val < 30)  {
        return 2
      } else {
        return 3
      }
    },
    findPath() {
      this._astar.initializeSearch(this.startCell, this.endCell)
      const result = this._astar.findPath()
      if (typeof result === 'number') {
        // bad stuff here
      } else {
        const cellPath = Util.transformNodestoCells(result)
        this.cellPath = cellPath
      }
      console.log(Util.transformNodestoCells(result))
    },
    getColor(hVal) {
      const color = shadeColor2(red, 1 - hVal/100)
      return color
    },
    chooseEnd(e) {
      this.selectGoal = !this.selectGoal
    },
    chooseStart(e) {
      this.selectStart = !this.selectStart
    },
    markableCell(i,j) {
      const markable = !((this.endCell.x === i && this.endCell.y === j) || (this.startCell.x === i && this.startCell.y === j))
      return markable
    },
    isStart(i, j){
      return i == this.startCell.x && j == this.startCell.y
    },
    isEnd(i,j) {
      return i == this.endCell.x && j == this.endCell.y
    },
    isOpen(i,j) {
      return false
    },
    isClosed(i,j) {
      return false
    },
    isPath(i,j) {
      const item = _.find(this.cellPath, (cell) => {
        return cell.x === i && cell.y === j
      })
      return item !== undefined
    },
    heuristicFunction(node, goalNode){
      return costFunction(node, goalNode)
    },
    totalCostFunction(node1, node2) {
      return this.heuristicGrid[node2.x][node2.y] + costFunction(node1,node2)
    },
    reset() {
      this.heuristicGrid = create2DArray(this.rows, this.cols)
      this._astar = new AStar(this.totalCostFunction, this.heuristicFunction, {x: this.rows, y: this.cols })
      this.startCell = { x: 0, y: 0 },                          // Starting Cell
      this.endCell = { x: 9, y: 9 },                             // Ending Cell
      this.searching = false,
      this.cellPath = []  
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

.circle
{
    padding: 10px 11px;
    background: none;
    width: 2px;
    border-radius: 100%;
    margin-left: auto;
    margin-right: auto;
    width: 1%;
}

.circle_green
{
    background: green;
}

.circle_red
{
    background: red;
}

.circle_path
{
  background: lawngreen
}
</style>
