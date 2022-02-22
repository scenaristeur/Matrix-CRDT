<template>
  <b-modal id="modal-login-form" title="LoginForm" size="lg" @ok="login">
    <b-container fluid>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="server-url"><code>Homeserver</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="server-url" v-model="server.url"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="3">
          <label for="user"><code>Matrix user id</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="user"
          v-model="server.user"
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
            <b-form-radio v-model="server.authMethod"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="password">Password</b-form-radio>
            <b-form-radio v-model="server.authMethod"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="token">Token</b-form-radio>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="my-1" v-if="server.authMethod == 'token'">
        <b-col sm="3">
          <label for="token"><code>Access token</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="token"
          v-model="server.token"
          ></b-form-input>
          <small><i>You can find your access token in Element Settings -&gt; Help &
          About. <br>Your access token is only shared with the Matrix server.</i></small>
        </b-col>
      </b-row>

      <b-row class="my-1" v-if="server.authMethod == 'password'">
        <b-col sm="3">
          <label for="password"><code>Password</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="password"
          v-model="server.password"
          ></b-form-input>
          <small><i>Your password is only shared with the Matrix server.</i></small>
        </b-col>
      </b-row>


      <b-row class="my-1">
        <b-col sm="3">
          <label for="room"><code>Room alias</code>:</label>
        </b-col>
        <b-col sm="9">
          <b-form-input id="room"
          v-model="server.roomAlias"
          placeholder="e.g.: #matrix-crdt-test:matrix.org"
          ></b-form-input>
        </b-col>
      </b-row>











    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "LoginForm",
  methods:{
    login(){
      console.log(this.server)
    }
  },
  computed: {
    server: {
      get () { return this.$store.state.server },
      set (value) { this.$store.commit('setSession', value) }
    },
  }
}
</script>

<style>

</style>
