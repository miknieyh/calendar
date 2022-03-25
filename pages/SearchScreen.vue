<template>

  <div>
    <main-button/>
    <app-logo/></div>

</template>

<script>
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import AppLogo from '~/components/SearchScreen.vue'
import MainButton from '~/components/MainButton.vue'
Vue.config.productionTip = false;
export default {
  components: {
    AppLogo,
    MainButton
  }

}
</script>

<style>

</style>

