/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// require('select2');
window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('manual-control', require('./components/ManualControlComponent.vue').default);
Vue.component('dronestatus', require('./components/DroneStatusComponent.vue').default);
Vue.component('droneselect', require('./components/MultiSelectFormComponent.vue').default);
Vue.component('drone-map', require('./components/MapComponent.vue').default);
Vue.component('map-marker', require('./components/MapMarkerComponent.vue').default);
Vue.component('mission-map', require('./components/MissionPlanComponent.vue').default);
Vue.component('heatmap', require('./components/HeatmapComponent.vue').default);
Vue.component('test', require('./components/TestComponent.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css';

Vue.use(Vuesax, {
  // options here
})

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.component('VueSlider', VueSlider)

const app = new Vue({
    el: '#app',
});
