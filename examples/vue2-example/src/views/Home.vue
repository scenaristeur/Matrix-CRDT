<template>
  <div class="home">

       <tiptap v-model="text"/>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Tiptap from '@/components/Tiptap.vue'


export default {
  name: 'Home',
  components: {
    HelloWorld,
    Tiptap
  },
  data(){
    return{
      text: '<p>I’m running Tiptap with Vue.js. 🎉, yeah !!</p>'
    }
  }
}
</script>
