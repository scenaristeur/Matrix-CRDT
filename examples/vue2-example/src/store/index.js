import Vue from 'vue'
import Vuex from 'vuex'
import sdk from "matrix-js-sdk";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null,
    LoginData: {
      server: "https://matrix.org",
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
    },
    setLoginData(state, ld){
      state.LoginData = ld
    }
  },
  actions: {
    async createMatrixClient(context, data){
      const signInOpts = {
        baseUrl: data.server,

        userId: data.user,
      };

      const matrixClient =
      data.authMethod === "token"
      ? sdk.createClient({
        ...signInOpts,
        accessToken: data.token,
      })
      : sdk.createClient(signInOpts);

      if (data.authMethod === "token") {
        await matrixClient.loginWithToken(data.token);
      } else {
        await matrixClient.login("m.login.password", {
          user: data.user,
          password: data.password,
        });
      }

      // overwrites because we don't call .start();
      matrixClient.canSupportVoip = false;
      matrixClient.clientOpts = {
        lazyLoadMembers: true,
      };
      console.log(matrixClient)
      context.state.session = matrixClient
      return matrixClient;


    }
  },
  modules: {
  }
})
