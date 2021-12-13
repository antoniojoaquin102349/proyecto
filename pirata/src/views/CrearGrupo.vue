<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
        <div class="card px-3">
          <div class="card-body">
            <div class="add-items d-flex">
              <input
                type="text"
                v-model="grupoNombre"
                class="form-control todo-list-input"
                placeholder="Introduce un título"
              />
            </div>
              <select class="form-select form-select-lg mb-3 select"
               aria-label="Default select example" v-model="grupoTipo">
                <option selected>Selecciona el tipo de subscripción</option>
                <option value="netflix">Netflix</option>
                <option value="hbo">HBO</option>
                <option value="disney">Disney+</option>
                <option value="dazn">Dazn</option>
                <option value="spotify">Spotify</option>
              </select>
            <div class="add-items d-flex">
              <input
                type="number"
                v-model="grupoPrecio"
                class="form-control todo-list-input"
                placeholder="Introduce un precio"
              />
            </div>
            <div class="add-items d-flex">
              <input
                type="number"
                v-model="grupoSitios"
                class="form-control todo-list-input"
                placeholder="Introduce el número de participantes"
              />
            </div>
            <div class="add-items d-flex">
              <button
                class="add btn btn-primary font-weight-bold todo-list-add-btn"
                :class="{ disabled: !hasSession }"
                @click.prevent="addGrupo"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  .select{
    width: 100%;
    height: 50px;
  }
</style>