<template>
  <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <template v-for="menuItem in routes">
          <li
            v-if="mustBeRendered(menuItem)"
            :key="menuItem.name"
            class="nav-item active"
          >
            <a
              class="nav-link"
              href="#"
              @click.prevent="openPage(menuItem.path)"
              >{{ menuItem.label }}</a
            >
          </li>
        </template>
        <li v-if="hasSession" class="nav-item">
          <a
            class="nav-link btn btn-info"
            href="#"
            @click.prevent="closeSession"
            >Cerrar sesión</a
          >
        </li>
      </ul>
    </div>
  </nav> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <h1 class="navbar-brand">Pirata</h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          <li class="nav-item" v-if="hasSession">
            <a class="nav-link" href="/crear-grupo">Crear grupo</a>
          </li>
          <li class="nav-item" v-if="!hasSession">
            <a class="nav-link" href="/register">Registrarse</a>
          </li>
          <li class="nav-item" v-if="!hasSession">
            <a class="nav-link" href="/login">Iniciar sesión</a>
          </li>
          <li v-if="hasSession" class="nav-item">
            <a
              class="nav-link btn btn-info"
              href="#"
              @click.prevent="closeSession"
              >Cerrar sesión</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
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