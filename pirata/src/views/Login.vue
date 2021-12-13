<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2">
      <form class="mt-5">
        <h3>Identifícate</h3>
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="user.username"
            placeholder="Dirección de correo electrónico"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            class="form-control"
            v-model="user.password"
            placeholder="Contraseña (mínimo 6 caracteres)"
          />
        </div>
        <div class="my-3 alert alert-danger" v-if="formError !== ''">
          {{ formError }}
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="login">
          Entrar
        </button>
        <button class="ml-2 btn btn-secondary" @click="gotToResetPassword">
          Olvidé mi contraseña
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {Auth} from '@/modules/firebase'

export default {
  name: "LoginPage",
  data() {
    return {
      formError: "",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.formError = "";

      if (this.user.username === "") {
        this.formError = "Debes introducir tu email";
        return;
      }

      if (this.user.password.length < 6) {
        this.formError = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      //llamar a firebase auth método login
      try{
          const response = await Auth.signInWithEmailAndPassword(this.user.username,this.user.password)

      
      }catch(e){
          this.formError = e.message
      }
    },
    gotToRegisterPage() {
      this.$router.push({ name: "register" });
    },
    gotToResetPassword() {
      this.$router.push({ name: "reset_password" });
    },
  },
};
</script>