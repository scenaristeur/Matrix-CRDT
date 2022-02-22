import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    server: {
      url: "https://matrix.org",
      user: "@spoggy:matrix.org",
      token: "",
      password: "",
      roomAlias: "#matrix-crdt-test:matrix.org",
      authMethod: "password",//password | token
      validationResult: ""//format | prefix
    }
  },
  mutations: {
    setSession(state, s){
      state.session = s
    }
  },
  actions: {
  },
  modules: {
  }
})
