<template>
 <div class="row">
    <div class="col-sm-7 offset-sm-2">
      <form class="mt-5">
        <h3>Regístrate</h3>
        <div class="form-group">
          <label for="exampleInputPassword1">Nombre</label>
          <input type="text" class="form-control" v-model="userData.nombre" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Teléfono</label>
          <input type="number" class="form-control" v-model="userData.telefono" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Tarjeta</label>
          <input type="number" class="form-control" v-model="userData.tarjeta" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Email</label>
          <input type="email" class="form-control" v-model="userData.email" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            class="form-control"
            v-model="userData.password"
          />
        </div>
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            v-model="userData.legalChecked"
          />
          <label class="form-check-label" for="exampleCheck1"
            >Acepto las condiciones generales y la política de privacidad</label
          >
        </div>
        <div class="my-3 alert alert-danger" v-if="formError !== ''">
          {{ formError }}
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          @click.prevent="createAccount"
        >
          Crear cuenta
        </button>
        <button class="ml-2 btn btn-secondary" @click="returnToLoginPage">
          Volver
        </button>
      </form>
    </div>
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
        nombre:"",
        telefono:"",
        email: "",
        targeta:"",
        password: "",
        legalChecked: false,
      },
    };
  },
  methods: {
    async createAccount() {
      this.$router.replace({name: 'home'})
      
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
    returnToLoginPage() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>