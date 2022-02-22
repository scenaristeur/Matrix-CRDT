<template>
  <div>
    <b-button v-if="matrixClient == null" variant="success" @click="openLoginForm">
      Login
    </b-button>
    <b-button v-else variant="warning" @click="logout">
      Logout
    </b-button>
    <LoginForm />
  </div>

</template>

<script>
import LoginForm from '@/components/login/LoginForm.vue'

export default {
  name: "LoginButton",
  components: {
    LoginForm
  },
  methods: {
    openLoginForm(){
      console.log("open")
      this.$bvModal.show("modal-login-form")
    },
    logout(){
      console.log("logout")
      this.matrixClient = null
    }
  },
  computed: {
    matrixClient: {
      get () { return this.$store.state.matrixClient },
      set (/*value*/) {  }
    },
  }
}
</script>

<style>

</style>
