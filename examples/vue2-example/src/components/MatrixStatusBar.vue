<template>
  <div>
    <LoginButton />
    <b-form-group label="Matrix status" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
      id="radio-group-2"
      v-model="online"
      :aria-describedby="ariaDescribedby"
      name="radio-sub-component"
      >
      <b-form-radio
      :aria-describedby="ariaDescribedby"
      name="online-offline"
      value=true>Online</b-form-radio>
      <b-form-radio
      :aria-describedby="ariaDescribedby"
      name="online-offline"
      value=false >Offline (disable sync)</b-form-radio>
    </b-form-radio-group>
  </b-form-group>
<button @click="test">Test</button>
  <div class="mt-3">Online: <strong>{{ online }}</strong></div>
  <!-- <div class="mt-3">Doc: <strong>{{ doc  }}</strong></div> -->

</div>
</template>

<script>
import LoginButton from '@/components/login/LoginButton.vue'

export default {
  name: "MatrixStatusBar",
  props: ['doc'],
  components: {
    LoginButton
  },
  data(){
    return{
      online: false
    }
  },
  methods:{
    test(){
      console.log(this.doc)
    },
    onConnectChange(){
      console.log(this.online)
    }
  },
  watch:{
    doc() {
      console.log(this.doc)
    },
    online(){
      this.onConnectChange()
    },
    matrixClient(){
      console.log(this.matrixClient)
    }
  },
  computed: {
    matrixClient: {
      get () { return this.$store.state.matrixClient },
      set (/*value*/) {  }
    },
    // doc: {
    //   get () { return this.$store.state.doc },
    //   set (/*value*/) {  }
    // },
  }
}
</script>

<style>

</style>
