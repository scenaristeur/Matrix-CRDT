import Vue from 'vue'
import Vuex from 'vuex'
import sdk from "matrix-js-sdk";
import { MatrixProvider } from "matrix-crdt";
// import { MatrixClient } from "matrix-js-sdk";
import * as Y from "yjs";

const yDoc = new Y.Doc();

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    matrixClient: null,
    LoginData: {
      server: "https://matrix.org",
      user: "@spoggy:matrix.org",
      token: "",
      password: "",
      roomAlias: "#matrix-crdt-test:matrix.org",
      authMethod: "password",//password | token
      validationResult: ""//format | prefix
    },
    doc: {
      isOpen: false,
      matrixProvider : undefined,
      status: "", // "loading" | "failed" | "ok" | "disconnected",
      matrixClient: null,
      roomAlias: ""
    }
  },
  mutations: {
    setMatrixClient(state, mc){
      state.matrixClient = mc
    },
    setLoginData(state, ld){
      state.LoginData = ld
    }
  },
  actions: {
    async createMatrixClient(context, data){
      if (context.state.matrixProvider) {
        context.state.matrixProvider.dispose();
        context.state.doc.status ="disconnected"
        context.state.doc.matrixProvider = undefined
      }


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
      context.state.matrixClient = matrixClient
      context.dispatch('connect', {matrixClient: matrixClient, roomAlias: data.roomAlias})
      //return matrixClient;
    },
    async connect(context, params){
      let matrixClient = context.state.doc.matrixClient = params.matrixClient
      let roomAlias = context.state.doc.roomAlias = params.roomAlias
      console.log(context.state.doc)
      if (!matrixClient || !roomAlias) {
        throw new Error("can't connect without matrixClient or roomAlias");
      }

      // This is the main code that sets up the connection between
      // yjs and Matrix. It creates a new MatrixProvider and
      // registers it to the `doc`.
      const newMatrixProvider = new MatrixProvider(
        yDoc,
        matrixClient,
        { type: "alias", alias: roomAlias },
        undefined,
        {
          translator: { updatesAsRegularMessages: true },
          reader: { snapshotInterval: 10 },
          writer: { flushInterval: 500 },
        }
      );
      context.state.doc.status = "loading"
      newMatrixProvider.initialize();
      context.state.doc.matrixProvider = newMatrixProvider;

      // (optional): capture events from MatrixProvider to reflect the status in the UI
      newMatrixProvider.onDocumentAvailable((e) => {
        context.state.doc.status = "ok"
        console.log(e)
      });

      newMatrixProvider.onCanWriteChanged((e) => {
        console.log(e)
        if (!newMatrixProvider.canWrite) {
          context.state.doc.status = "failed "+ e
        } else {
          context.state.doc.status = "ok"
        }
      });

      newMatrixProvider.onDocumentUnavailable((e) => {
        console.log(e)
        context.state.doc.status = "failed "+ e
      });


    }
  },
  modules: {
  }
})
