<template>
  <div class="home">
    <LoginButton />
       <tiptap v-model="text"/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Tiptap from '@/components/Tiptap.vue'
import LoginButton from '@/components/login/LoginButton.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Tiptap,
    LoginButton
  },
  data(){
    return{
      text: '<p>I’m running Tiptap with Vue.js. 🎉, yeah !!</p>'
    }
  }
}
</script>
