import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)
import {actions} from "@/store/modules/actions";
import {getters} from "@/store/modules/getters";
import {mutations} from "@/store/modules/mutations";
import {state} from "@/store/modules/state";

const store = () => new Vuex.Store({
  state: state,
  actions:actions,
  getters:getters,
  mutations:mutations
  }
)

export default store;
