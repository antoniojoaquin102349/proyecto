<template>
  <div class="list-wrapper">
    <ul v-if="grupos !== null" class="d-flex flex-column-reverse todo-list">
      <grupo-list-item
        v-for="grupo in grupos"
        :key="grupo['.key']"
        :grupo="grupo"
      />
    </ul>
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
  computed: {
    hasSession() {
      return true //Auth.currentUser !== null;
    },
  },
  data(){
    return {
      grupos: []
    }
  },
  firestore() {
    return {
        grupos: GruposRef.orderBy("tipo", "desc"),
    };
  },
};
</script>
<style>
</style>
