<template>
  <div class="container">
    <section class="center">
    <h1 class="title">Cambia tu constraseña</h1>
      <b-field label="Email">
        <b-input
          placeholder="Dirección de correo electrónico"
          type="email"
          v-model="email"
        ></b-input>
      </b-field>
      <b-button class="boton" type="is-primary"  @click.prevent="resetPassword">Solicitar cambio</b-button>
       <b-button type="is-danger" @click="gotToRegisterPage">Volver</b-button>
    </section>

    <!-- <form class="mt-5">
      <div class="my-3 alert alert-danger" v-if="formError !== ''">
        {{ formError }}
      </div>
    </form> -->
  </div>
</template>

<script>
import { Auth } from "@/modules/firebase";

export default {
  name: "ResetPasswordPage",
  data() {
    return {
      formError: "",
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      this.formError = "";

      if (this.email === "") {
        this.formError = "Debes introducir tu email";
        return;
      }

      try {
        const response = await Auth.sendPasswordResetEmail(this.email);
        alert("Le hemos enviado un correo");
        console.info(response);
        this.$router.replace({ name: "login" });
      } catch (e) {
        this.formError = e.message;
      }
    },
    gotToRegisterPage() {
      this.$router.push({ name: "login" });
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