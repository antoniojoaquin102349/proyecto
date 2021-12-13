<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2">
      <form class="mt-5">
        <h3>Cambia tu constraseña</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Dirección de correo electrónico"
          />
        </div>
        <div class="my-3 alert alert-danger" v-if="formError !== ''">
          {{ formError }}
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="resetPassword">
          Solicitar cambio
        </button>
        <button class="ml-2 btn btn-secondary" @click="gotToRegisterPage">
          Volver
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {Auth} from '@/modules/firebase'

export default {
  name: "ResetPasswordPage",
  data() {
    return {
      formError: '',
      email: ''
    };
  },
  methods: {
    async resetPassword() {
      this.formError = "";

      if (this.email === "") {
        this.formError = "Debes introducir tu email";
        return;
      }

      try{
          const response = await Auth.sendPasswordResetEmail(this.email)
          alert("Le hemos enviado un correo")
          console.info(response)
          this.$router.replace({name: 'login'})
      }catch(e){
          this.formError = e.message
      }
    },
    gotToRegisterPage() {

      this.$router.push({name: 'login'});
      
    },
  },
};
</script>