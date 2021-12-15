<template>
  <div class="card">
    <header class="card-header"
     v-bind:class="{
        netflix: grupo.tipo === 'netflix',
        disney: grupo.tipo === 'disney',
        dazn: grupo.tipo === 'dazn', 
        hbo: grupo.tipo === 'hbo',
        spotify: grupo.tipo === 'spotify' 
        }">
      <p class="card-header-title texto">
        {{ grupo.tipo }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <ul>
          <li>
            <strong>{{ grupo.title }}</strong>
          </li>
          <li><strong>Precio</strong>: {{ grupo.precio }}€</li>
          <li><strong>Sitios disponibles</strong>: {{ grupo.usuarios.length }}/{{ grupo.sitios }}</li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
      <b-button type="is-primary" focused class="card-footer-item"
        @click.prevent="unirse">Unirse</b-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "GrupoListItem",
  props: ["grupo"],
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    unirse() {
       this.$emit('uniserAlGrupo', {grupo: this.grupo})
    }
  }
};
</script>

<style>
.netflix {
  background-color: red !important;
}
.disney {
  background-color: blue !important;
}
.dazn {
  background-color: black !important;
}
.hbo {
  background-color: brown !important;
}
.spotify {
  background-color: green !important;
}
.texto {
  color: white !important;
}
.content{
  background-color: rgb(233, 193, 141);
}
</style>