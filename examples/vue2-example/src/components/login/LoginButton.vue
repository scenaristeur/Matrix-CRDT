<template>
  <b-button v-if="session == null" variant="success" @click="openLoginForm">
    Login
  </b-button>
  <b-button v-else variant="warning" @click="logout">
    Logout
  </b-button>


</template>

<script>
export default {
  name: "LoginButton",
  data(){
    return{
      session: null
    }
  },
  methods: {
    openLoginForm(){
      console.log("open")
      this.session = true
    },
    logout(){
      console.log("logout")
      this.session = null
    }
  },
  computed: {
   login: {
     get () { return this.$store.state.session },
     set (value) { this.$store.commit('setSession', value) }
   },
 }
}
</script>

<style>

</style>
