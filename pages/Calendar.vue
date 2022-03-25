<template>
  <div>
  <main-button/>
    <CalendarTitle/>
    <div class="container">
      <app-logo/><CalendarTable/>
</div>
</div>
</template>

<script>

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import AppLogo from '~/components/Calendar.vue'
import MainButton from '~/components/MainButton.vue'
import CalendarTable from '~/components/CalendarTable'
import CalendarTitle from "~/components/CalendarTitle"

Vue.config.productionTip = false;
export default {
  components: {
    CalendarTitle,
    CalendarTable,
    AppLogo,
    MainButton
  }

}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

