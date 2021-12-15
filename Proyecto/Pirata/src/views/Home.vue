<template>
  <div class="container">
    <section class="separarse">
      <b-dropdown aria-role="list" @click.prevent="filtrar('algo')">
        <template #trigger="{ active }">
          <b-button
            label="Filtrar grupos"
            type="is-primary"
            :icon-right="active ? 'menu-up' : 'menu-down'"
          />
        </template>
        <b-dropdown-item aria-role="listitem" @click="filtrar('hbo')"
          >HBO</b-dropdown-item
        >
        <b-dropdown-item aria-role="listitem" @click="filtrar('netflix')"
          >Netfilx</b-dropdown-item
        >
        <b-dropdown-item aria-role="listitem" @click="filtrar('dazn')"
          >DAZN</b-dropdown-item
        >
        <b-dropdown-item aria-role="listitem" @click="filtrar('spotify')"
          >Spotify</b-dropdown-item
        >
        <b-dropdown-item aria-role="listitem" @click="filtrar('disney')"
          >Disney</b-dropdown-item
        >
      </b-dropdown>
    </section>
    <div class="columns is-multiline">
      <template v-if="grupos !== null">
        <div class="column is-4" v-for="grupo in grupos" :key="grupo['.key']">
          <grupo-list-item :grupo="grupo" @uniserAlGrupo="uniserAlGrupo" />
        </div>
      </template>
      <h2 class="mensaje" v-if="grupos.length === 0">
        No hay grupos disponibles
      </h2>
    </div>
  </div>
</template>

<script>
import { GruposRef, Auth } from "@/modules/firebase";
import GrupoListItem from "@/components/GrupoListItem";

export default {
  name: "HomePage",
  components: {
    GrupoListItem,
  },
  methods: {
    async uniserAlGrupo(eventData) {
      try {
        if (Auth.currentUser === null) {
          this.$buefy.snackbar.open({
            message: "Necesitas iniciar sesión para unirte al grupo",
            type: "is-warning",
            position: "is-top",
            actionText: "Identificarse",
            indefinite: true,
            onAction: () => {
              this.$router.push({ name: "login" });
            },
          });
        } else {
          let completed = false;
          if (eventData.grupo.usuarios.length < eventData.grupo.sitios) {
            eventData.grupo.usuarios.push(Auth.currentUser.email);
            if (eventData.grupo.usuarios.length == eventData.grupo.sitios) {
              completed = true;
            }
          }
          const newGrupoData = {
            usuarios: eventData.grupo.usuarios,
            completed: completed,
          };
          const result = await GruposRef.doc(eventData.grupo[".key"]).update(
            newGrupoData
          );
        }
      } catch (e) {
        console.error(e);
      }
    },
      filtrar(value) {
      this.grupos = this.todos.filter((grupo) => grupo.tipo === value);

    }
  },
  computed: {
    hasSession() {
      return true;
    },
  },
  data() {
    return {
      grupos: [],
      todos:[],
    };
  },
  firestore() {
    return {
      grupos: GruposRef.where("completed", "==", false),
      todos: GruposRef.where("completed", "==", false),
    };
  },
};
</script>
<style>
.center {
  display: block;
  margin: 0 auto;
}
.fix {
  margin-bottom: 40px;
}
.mensaje {
  margin-top: 100px;
}
.white {
  background-color: white;
}
.separarse {
  margin-top: 10px;
  margin-bottom: 10px;
}
.container{
  background-color: cornsilk;
}
</style>
