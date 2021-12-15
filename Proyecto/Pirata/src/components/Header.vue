<template>
  <b-navbar class="navbar">
    <template #brand>
      <h1 id="color" class="title separarse">Pirata</h1>
    </template>
    <template #start>
      <a class="button is-primary separarse pabajo" href="/home">
            <strong>Home</strong>
      </a>
      <a class="button is-primary separarse pabajo" href="/crear-grupo" v-if="hasSession">
            <strong>Crear grupo</strong>
      </a>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" href="/register" v-if="!hasSession">
            <strong>Registrarse</strong>
          </a>
          <a class="button is-success" href="/login" v-if="!hasSession">
            Iniciar sesión
          </a>
          <a class="button is-primary" href="#" v-if="hasSession" @click.prevent="closeSession">
            <strong>Cerrar sesión</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { Auth } from "@/modules/firebase";

export default {
  name: "Header",
  props: {
    hasSession: {
      type: Boolean,
      default: false,
    },
    currentUser: {
      type: Boolean,
      default: Auth.currentUser,
    },
  },
  data() {
    return {
      routes: [
        {
          path: "/login",
          name: "login",
          label: "Identifícate",
          showWithSession: false,
          showWithoutSession: true,
        },
      ],
    };
  },
  methods: {
    async goToHomePage() {
      try {
        await this.$router.push({ name: "home" });
      } catch (e) {
        console.warn("cancela cambio, ruta destino igual a la de origen");
      }
    },
    async openPage(targetPath = null) {
      if (!targetPath) {
        return;
      }

      try {
        await this.$router.push(targetPath);
      } catch (e) {
        console.warn("Cancelado cambio de ruta");
      }
    },
    mustBeRendered(item) {
      if (this.hasSession) {
        return item.showWithSession;
      }

      return item.showWithoutSession;
    },
    async closeSession() {
      try {
        await Auth.signOut();

        if (this.$route.name !== "home") {
          this.$router.push({ name: "home" });
        }
      } catch (e) {
        console.error(e.message);
      }
    },
  },
};
</script>

<style>
  .navbar {
    background-color: rgb(2, 24, 2);
  }
  .separarse{
    margin-right: 10px;
    margin-left: 10px;
  }
  .pabajo{
    margin-top: 14px;
  }
  #color{
    margin-top: 10px;
    color: #16f016;
  }
</style>