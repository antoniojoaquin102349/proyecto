<template>
  <div class="container">
    <section class="center">
      <b-field
        label="Nombre"
        type="is-danger"
        message="Por favor mete un nombre"
      >
        <b-input
          v-model="grupoNombre"
          name="nombre"
          type="text"
          expanded
          placeholder="Introduce el nombre del grupo"
        ></b-input>
      </b-field>

      <b-field label="Tipo">
        <b-select v-model="grupoTipo">
          <option selected>Selecciona el tipo de subscripción</option>
          <option value="netflix">Netflix</option>
          <option value="hbo">HBO</option>
          <option value="disney">Disney+</option>
          <option value="dazn">Dazn</option>
          <option value="spotify">Spotify</option>
        </b-select>
      </b-field>

      <b-field label="Precio">
        <b-input
          name="precio"
          type="number"
          placeholder="0"
          expanded
          v-model="grupoPrecio"
          ></b-input>
      </b-field>

      <b-field label="Sitios">
        <b-input
          name="sitios"
          type="number"
          placeholder="0"
          expanded
          v-model="grupoSitios"
        ></b-input>
      </b-field>

      <b-field>
        <p class="control">
          <b-button label="Crear" type="is-primary" 
          :class="{ disabled: !hasSession }"
        @click.prevent="addGrupo"/>
        </p>
      </b-field>
    </section>
  </div>
</template>

<script>
import { GruposRef, Auth } from "@/modules/firebase";

export default {
  name: "CrearGrupo",
  computed: {
    hasSession() {
      return Auth.currentUser !== null;
    },
  },
  data() {
    return {
      grupoNombre: "",
      grupoTipo: "Selecciona el tipo de subscripción",
      grupoPrecio: "",
      grupoSitios: "",
    };
  },
  methods: {
    async addGrupo() {
      if (this.grupoNombre !== "" && this.grupoNombre.length > 3) {
        const currentUser = Auth.currentUser;

        const grupoData = {
          title: this.grupoNombre,
          tipo: this.grupoTipo,
          precio: this.grupoPrecio,
          sitios: this.grupoSitios,
          usuarios: [],
          completed: false,
        };

        console.info(grupoData);
        try {
          const result = await GruposRef.add(grupoData);
          this.$router.push({ name: "home" });
          console.info(result);
        } catch (e) {
          console.error(e);
        }
      }
    },
    async modifyGrupoComplete(eventData) {
      console.info(eventData);
      try {
        const newGrupoData = {
          completed: eventData.completed,
          updated_at: new Date(),
        };
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style>
  .center {
    padding: 20px 250px;
  }
</style>