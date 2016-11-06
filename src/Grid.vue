<template>
<div>
    <table class="grid" @mousedown="startDrag" @touchstart="startDrag" @mousemove="onDrag" @touchmove="onDrag"
    @mouseup="stopDrag" @touchend="stopDrag" @mouseleave="stopDrag">
        <tr>
            <td></td>
            <td></td>
        </tr>
    </table>
</div>

</template>

<script>
export default {
  name: 'grid',
  props: {
    rows: 'Number',
    cols: 'Number',
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dragging: false,
    }
  },
  methods: {
    startDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      this.dragging = true
      console.log(e.x, e.y)
      },
    onDrag: function (e) {
      e = e.changedTouches ? e.changedTouches[0] : e
      if (this.dragging) {
        console.log(e.x, e.y)
      }
    },
    stopDrag: function () {
      if (this.dragging) {
        this.dragging = false
      }
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
    font-family:sans-serif; font-size:13px
}
.grid td.clicked {
    background-color:yellow;
    font-weight:bold; color:red;
}
</style>
