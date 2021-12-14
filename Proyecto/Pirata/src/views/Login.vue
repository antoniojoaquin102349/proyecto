<template>
  <div class="container">
    <section class="center">
      <h1 class="title">Identifícate</h1>
      <b-field
        label="Email"
        :type="{ 'is-danger': formErrorEmail }"
        :message="{ 'Debe introducir un email': formErrorEmail }"
      >
        <b-input
          v-model="user.username"
          value=""
          maxlength="30"
          placeholder="Dirección de correo electrónico"
        ></b-input>
      </b-field>

      <b-field
        label="Contraseña"
        :type="{ 'is-danger': formErrorPass }"
        :message="[
          { 'La contraseña es muy corta': formErrorPass },
          { 'La contraseña debe tener al menos 6 carácteres': formErrorPass },
        ]"
      >
        <b-input
          v-model="user.password"
          value=""
          type="password"
          maxlength="30"
          placeholder="Contraseña (mínimo 6 caracteres)"
        ></b-input>
      </b-field>
      <b-button type="is-success" @click.prevent="login" class="boton"
        >Entrar</b-button
      >
      <b-button type="is-warning" @click="gotToResetPassword"
        >Olvidé mi contraseña</b-button
      >
    </section>
  </div>
</template>

<script>
import { Auth } from "@/modules/firebase";

export default {
  name: "LoginPage",
  data() {
    return {
      formError: "",
      formErrorEmail: false,
      formErrorPass: false,
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      this.formError = "";
      this.formErrorEmail = false;
      this.formErrorPass =  false;

      if (this.user.username === "") {
        this.formError = 'Es nesesario un email';
        this.formErrorEmail = true
        return;
      }

      if (this.user.password.length < 6) {
        this.formError = 'La contraseña debe tener al menos 6 caracteres.';
        this.formErrorPass = true;
        return;
      }

      try {
        const response = await Auth.signInWithEmailAndPassword(
          this.user.username,
          this.user.password
        );
        this.$router.push({ name: "home" });
      } catch (e) {
        this.formError = e.message;
        this.$buefy.snackbar.open(`Email o contraseña inválidos`);
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

<style>
.boton {
  margin-right: 10px;
}
.center {
  padding: 20px 250px;
}
</style>