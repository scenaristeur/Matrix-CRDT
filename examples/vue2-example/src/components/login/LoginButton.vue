<template>
  <div>
    <b-button v-if="session == null" variant="success" @click="openLoginForm">
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
      this.session = true
      this.$bvModal.show("modal-login-form")
    },
    logout(){
      console.log("logout")
      this.session = null
    }
  },
  computed: {
    session: {
      get () { return this.$store.state.session },
      set (value) { this.$store.commit('setSession', value) }
    },
  }
}
</script>

<style>

</style>
