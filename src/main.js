import Vue from 'vue'
import App from './App.vue'
import 'bulma/css/bulma.css'
require('file?name=[name].[ext]!../index.html');
new Vue({
  el: '#app',
  render: h => h(App)
})
