<template>
  <div class="container">
      <section class="center"> 
    <h1 class="title">Regístrate</h1>
        <b-field label="Nombre">
          <b-input type="text" value="" v-model="userData.nombre"></b-input>
        </b-field>

        <b-field label="Teléfono">
          <b-input type="number" value="" v-model="userData.telefono"></b-input>
        </b-field>

        <b-field label="Tarjeta">
          <b-input
            type="number"
            value=""
            v-model="userData.tarjeta"
            placeholder="número de la tarjeta de credito"
          ></b-input>
        </b-field>

        <b-field label="Email" type="is-danger" message="Introduse un correo valido">
          <b-input
            type="email"
            value=""
            maxlength="30"
            v-model="userData.email"
            placeholder="Dirección de correo electrónico"
          >
          </b-input>
        </b-field>

        <b-field
          label="Contraseña"
          type="is-warning"
          :message="[
            'La contraseña es corta',
            'La contraseña debe de tener al menos 6 carácteres',
          ]"
        >
          <b-input
            value=""
            type="password"
            maxlength="30"
            placeholder="Contraseña (mínimo 6 caracteres)"
            v-model="userData.password"
          ></b-input>
        </b-field>
        <div class="form-check">
          <b-field>
            <b-checkbox
              id="exampleCheck1"
              v-model="userData.legalChecked"
              type="is-info"
            >
              Acepto las condiciones generales y la política de
              privacidad</b-checkbox
            >
          </b-field>
        </div>
        <b-button type="is-success" @click.prevent="createAccount"
         class="boton" >Crear cuenta</b-button
        >
        <b-button type="is-warning" @click="returnToHomePage">Volver</b-button>
      </section>

<!--
        <div class="my-3 alert alert-danger" v-if="formError !== ''">
          {{ formError }}

      </form>-->
  </div>
</template>

<script>
import { Auth } from "@/modules/firebase";

export default {
  name: "RegisterPage",
  data() {
    return {
      formError: "",
      userData: {
        nombre: "",
        telefono: "",
        email: "",
        targeta: "",
        password: "",
        legalChecked: false,
      },
    };
  },
  methods: {
    async createAccount() {
      this.$router.replace({ name: "home" });

      this.formError = "";

      console.info(this.userData.email);
      if (this.userData.email === "") {
        this.formError = "Debes introducir tu email";
        return;
      }

      if (this.userData.password.length < 6) {
        this.formError = "La contraseña debe tener al menos 6 caracteres.";
        return;
      }

      if (!this.userData.legalChecked) {
        this.formError =
          "Debes aceptar los términos y condiciones de todolist app.";
        return;
      }

      try {
        const result = await Auth.createUserWithEmailAndPassword(
          this.userData.email,
          this.userData.password
        );
      } catch (e) {
        this.formError = e.message;
      }
    },
    returnToHomePage() {
      this.$router.push({ name: "home" });
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