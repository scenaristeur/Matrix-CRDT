<template>
  <b-modal id="modal-login-form" title="LoginForm" size="lg" @ok="login">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="server-url"><code>Homeserver</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="server-url" v-model="LoginData.server"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label for="user"><code>Matrix user id</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="user"
          v-model="LoginData.user"
          placeholder="e.g.: @yousefed:matrix.org"
          ></b-form-input>
        </b-col>
      </b-row>


      <b-row class="my-1">
        <b-col sm="3">
          <label for="authMethod"><code>Sign in method</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-group label="Sign in method" v-slot="{ ariaDescribedby }">
            <b-form-radio v-model="LoginData.authMethod"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="password">Password</b-form-radio>
            <b-form-radio v-model="LoginData.authMethod"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="token">Token</b-form-radio>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="my-1" v-if="LoginData.authMethod == 'token'">
        <b-col sm="3">
          <label for="token"><code>Access token</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="token"
          v-model="LoginData.token"
          type="password"
          ></b-form-input>
        </b-col>
        <small><i>You can find your access token in Element Settings -&gt; Help &
          About. <br>Your access token is only shared with the Matrix LoginData.
        </i></small>
      </b-row>

      <b-row class="my-1" v-if="LoginData.authMethod == 'password'">
        <b-col sm="3">
          <label for="password"><code>Password</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="password"
          v-model="LoginData.password"
          type="password"
          ></b-form-input>
        </b-col>
        <small><i>Your password is only shared with the Matrix server.</i></small>
      </b-row>


      <b-row class="my-1">
        <b-col sm="3">
          <label for="room"><code>Room alias</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="room"
          v-model="LoginData.roomAlias"
          placeholder="e.g.: #matrix-crdt-test:matrix.org"
          ></b-form-input>

        </b-col>
        <small><i>
          The room alias must start "#matrix-crdt-" for testing purposes.<br>
          Room aliases should be of the format #alias:server.tld.<br>
          The room that application state will be synced with.
        </i></small>
      </b-row>

    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "LoginForm",
  methods:{
    login(){
      console.log(this.LoginData)
      this.$store.dispatch('createMatrixClient', this.LoginData)
    }
  },
  computed: {
    LoginData: {
      get () { return this.$store.state.LoginData },
      set (value) { this.$store.commit('setLoginData', value) }
    },
  }
}
</script>

<style>

</style>
