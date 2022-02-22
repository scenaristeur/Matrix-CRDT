<template>
  <div class="home">
       <tiptap />
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
  }
}
</script>
