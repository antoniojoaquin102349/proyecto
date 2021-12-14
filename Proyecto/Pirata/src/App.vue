<template>
  <div id="app">
    <Header :has-session="hasSession" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import {Auth} from '@/modules/firebase'
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      hasSession: true,
      currentUser: null,
    };
  },
  mounted() {
    Auth.onAuthStateChanged((user) => {
      this.hasSession = (user !== null)

      if(this.hasSession && this.$route.name === 'login' ||
      this.$route.name === 'register'){
        try{
          
        }catch(e){
          console.error(e.message)
        }
      }
    });
  },
};
</script>

<style>
</style>