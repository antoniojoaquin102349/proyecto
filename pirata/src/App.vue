<template>
  <div id="app">
    <Header :has-session="hasSession" />
    <router-view />
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
      console.info("cambio de estado de sesión", user)
      console.log(this.hasSession)
      this.hasSession = (user !== null)

      if(this.hasSession && this.$route.name === 'login' ||
      this.$route.name === 'register' ||
      this.$route.name === 'reset_password'){
        try{
          this.$router.replace({name: 'home'})
        }catch(e){
          console.error(e.message)
        }
      }
    });
  },
};
</script>